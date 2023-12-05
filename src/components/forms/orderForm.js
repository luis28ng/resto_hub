import React, { useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import AddOrderForm from './AddOrderForm';

import 'react-toastify/dist/ReactToastify.css';

const apiUrl = 'http://restohub-api.us-east-2.elasticbeanstalk.com';

const OrderForm = ({ customer, restaurantId }) => {
    const [foodItem, setFoodItem] = useState('');
    const [foodOrders, setFoodOrders] = useState(customer.foodOrders || []);
    const [editIndex, setEditIndex] = useState(null);
    const [showAddOrderModal, setShowAddOrderModal] = useState(false);


    const handleAddOrder = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/staff/createOrder`, {
                restaurantId: restaurantId,
                customerId: customer.id,
                foodItem: foodItem,
            });

            if (response.status === 201) {
                toast.success('Order created successfully', { position: toast.POSITION.TOP_RIGHT });

                //Fetch and Update the list of orders after creating a new order
                fetchOrders();
            }
            else {
                console.error('Failed to create order:', response.data);
                toast.error('Failed to create order', { position: toast.POSITION.TOP_RIGHT });
            }

        }
        catch (error) {
            console.error('Error creating order:', error);
            toast.error('Error creating order', { position: toast.POSITION.TOP_RIGHT });
        }
        // Reset form state
        setFoodItem('');
        setEditIndex(null);
        setShowAddOrderModal(false);
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/staff/orders?customerId=${customer.id}`);
            setFoodOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Error fetching orders', { position: toast.POSITION.TOP_RIGHT });
            setFoodOrders([]);
        }
    };


    const handleEditOrder = (index) => {
        setEditIndex(index);
        setFoodItem(foodOrders[index]);
    };

    const handleCancelOrder = (index) => {
        const updatedOrders = [...foodOrders];
        updatedOrders.splice(index, 1);
        setFoodOrders(updatedOrders);
        setEditIndex(null);
    };

    return (
        <div>
            {foodOrders.length > 0 ? (
                <div>
                    <ul>
                        {foodOrders.map((order, index) => (
                            <li key={index}>
                                <>
                                    <span>{order}</span>
                                    <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                        <Button variant="primary" onClick={() => handleEditOrder(index)}>
                                            Edit
                                        </Button>
                                        <Button variant="danger" onClick={() => handleCancelOrder(index)}>
                                            Cancel Order
                                        </Button>
                                    </div>
                                </>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <p>No orders yet</p>
                    <Button variant="primary" onClick={() => setShowAddOrderModal(true)}>
                        Add Order
                    </Button>
                </div>
            )}

            {showAddOrderModal && (
                <AddOrderForm handleAddOrder={handleAddOrder} handleClose={() => setShowAddOrderModal(false)} />
            )}


        </div>
    )
};

export default OrderForm
