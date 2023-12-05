import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Form, Modal } from 'react-bootstrap';

import 'react-toastify/dist/ReactToastify.css';

const apiUrl = 'http://restohub-api.us-east-2.elasticbeanstalk.com';

const AddOrderForm = ({ handleAddOrder, handleClose, restaurantId }) => {
    const [foodItem, setFoodItem] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [showAddOrderModal, setShowAddOrderModal] = useState(true)
    const [selectedItems, setSelectedItems] = useState([]);

    const handleInputChange = (e) => {
        setFoodItem(e.target.value);
    };

    // Fetch menu items based on the restaurantId
    const fetchMenuItems = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/staff/menuItems?restaurantId=${restaurantId}`);
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
            toast.error('Error fetching menu items', { position: toast.POSITION.TOP_RIGHT });
        }
    };

    const handleAddToOrder = () => {
        if (foodItem.trim() === '') {
            toast.warning('Please select a food item', { position: toast.POSITION.TOP_RIGHT });
            return;
        }
        // Find the selected menu item from menuItems
        const selectedItem = menuItems.find(item => item.name === foodItem);


        setSelectedItems([...selectedItems, foodItem]);
        setFoodItem('');
    };

    const handleRemoveFromOrder = (index) => {
        const updatedItems = [...selectedItems];
        updatedItems.splice(index, 1);
        setSelectedItems(updatedItems);
    };

    const handleSubmit = () => {
        // Pass the selected items to the parent component's add order function
        handleAddOrder(selectedItems);

        // Reset the form state
        setFoodItem('');
        setSelectedItems([]);
    };

    useEffect(() => {
        fetchMenuItems();
    }, [restaurantId]);


    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formFoodItem">
                        <Form.Label>Menu Items:</Form.Label>
                        <div>
                            {/* Display selected items with Remove button */}
                            {selectedItems.map((item, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    <span>{item}</span>
                                    <Button
                                        variant=""
                                        size="lg"
                                        className="close"
                                        style={{ marginLeft: 'auto', fontSize: '2.0em', padding: '0' }}
                                        onClick={() => handleRemoveFromOrder(index)}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Form.Control as="select" value={foodItem} onChange={handleInputChange} onClick={handleAddToOrder}>
                            <option value="" disabled>Select food item</option>
                            {menuItems && menuItems.map((menuItem) => (
                                <option key={menuItem.id} value={menuItem.name}>
                                    {`${menuItem.name} - ${menuItem.price}`}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    Add Order
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export default AddOrderForm;
