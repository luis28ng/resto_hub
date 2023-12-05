// AddOrderForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Form, Modal } from 'react-bootstrap';
import { getRestId } from "../../utils/utils.js";

const AddOrderForm = ({ handleAddOrder, handleClose }) => {
    const [foodItem, setFoodItem] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [restaurantId, setRestaurantId] = useState('');
    const [orderStatus, setOrderStatus] = useState('PENDING');

    const handleInputChange = (e) => {
        setFoodItem(e.target.value);
    };

    useEffect(() => {
        setRestaurantId(getRestId());
    }, []);

    useEffect(() => {
        getMenu();
    }, [restaurantId]);

    const getMenu = async () => {
        try {
            const response = await axios.get("http://restohub-api.us-east-2.elasticbeanstalk.com/api/staff/menuItems", {
                params: {
                    restaurantId: restaurantId
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setMenuItems(response.data)
        } catch (e) {
            console.log(e)
        }
    };

    const handleAddToOrder = () => {
        if (foodItem.trim() === '') {
            toast.warning('Please select a food item', { position: toast.POSITION.TOP_RIGHT });
            return;
        }

        const selectedItem = menuItems.find((item) => item.name === foodItem);

        if (selectedItems.includes(foodItem)) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [foodItem]: (prevQuantities[foodItem] || 0) + 1,
            }));
        } else {
            setSelectedItems([...selectedItems, foodItem]);
            setQuantities({
                ...quantities,
                [foodItem]: 1,
            });
        }

        setFoodItem('');
    };

    const calculateSubtotal = (item) => {
        const menuItem = menuItems.find((menuItem) => menuItem.name === item);
        const quantity = quantities[item] || 1;
        return menuItem.price * quantity;
    };

    const calculateTotal = () => {
        return selectedItems.reduce((total, item) => total + calculateSubtotal(item), 0);
    };

    const handleRemoveFromOrder = (item) => {
        const updatedItems = [...selectedItems];
        const updatedQuantities = { ...quantities };
        const index = updatedItems.indexOf(item);

        if (index !== -1) {
            updatedItems.splice(index, 1);
            delete updatedQuantities[item];
            setSelectedItems(updatedItems);
            setQuantities(updatedQuantities);
        }
    };

    const handleSubmit = () => {
        const orderRequest = {
            reservationCode: '',
            orderStatus: orderStatus,
            instructions: '',
            restaurantId: parseInt(restaurantId, 10),
            orderItems: selectedItems.map((itemName, index) => {
                const menuItem = menuItems.find((item) => item.name === itemName);

                if (!menuItem || menuItem.id == null) {
                    console.error(`Invalid menuItem or missing itemId at index ${index} for itemName: ${itemName}`, menuItem);
                    return null; // or handle the issue appropriately
                }

                const quantity = quantities[itemName] || 1;
                const subTotal = quantity * menuItem.price;

                return {
                    itemId: menuItem.id,
                    menuItem: menuItem,
                    quantity: quantity,
                    pricePerItem: menuItem.price,
                    subTotal: subTotal,
                };
            }).filter(Boolean),
        };

        console.log('Order Request:', orderRequest);

        handleAddOrder(orderRequest);

        setFoodItem('');
        setSelectedItems([]);
        setQuantities({});
    };

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formFoodItem">
                        <Form.Label htmlFor="formFoodItem">Menu Items:</Form.Label>
                        <div>
                            {selectedItems.map((item, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    <span>{item}</span>
                                    <Form.Control
                                        type="number"
                                        value={quantities[item]}
                                        onChange={(e) =>
                                            setQuantities({
                                                ...quantities,
                                                [item]: parseInt(e.target.value, 10) || 1,
                                            })
                                        }
                                        style={{ width: '60px', marginLeft: '10px' }}
                                        id={`quantityInput_${index}`}
                                    />
                                    <span style={{ marginLeft: '10px' }}>
                                        Subtotal: ${calculateSubtotal(item).toFixed(2)}
                                    </span>
                                    <Button
                                        variant=""
                                        size="sm"
                                        className="close"
                                        style={{ marginLeft: 'auto', fontSize: '2.0em', padding: '', color: 'red' }}
                                        onClick={() => handleRemoveFromOrder(item)}
                                        id={`removeButton_${index}`}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Form.Control
                            as="select"
                            value={foodItem}
                            onChange={handleInputChange}
                            onClick={handleAddToOrder}
                        >
                            <option value="" disabled>
                                Select food item
                            </option>
                            {menuItems.map((menuItem) => (
                                <option key={menuItem.id} value={menuItem.name}>
                                    {`${menuItem.name} - ${menuItem.price}`}
                                </option>
                            ))}
                        </Form.Control>

                        <Form.Control
                            as="select"
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                            id="orderStatusSelect"
                        >
                            <option value="PENDING">Pending</option>
                            <option value="INPROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ marginBottom: '10px' }}>
                        Total: ${calculateTotal().toFixed(2)}
                    </span>
                    <Button variant="primary" onClick={handleSubmit}>
                        Add Order
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default AddOrderForm;
