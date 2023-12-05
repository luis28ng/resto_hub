import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import AddOrderForm from './AddOrderForm';
import { getRestId } from "../../utils/utils.js";
import OrderTable from '../tables/OrderTable';

import 'react-toastify/dist/ReactToastify.css';

const apiUrl = 'http://restohub-api.us-east-2.elasticbeanstalk.com';

/**
 * Creates and manages a form for food orders.
 * 
 * @param {Object} orderRequest - The details of the order request.
 * @param {Object} customer - The customer for whom the orders are being managed.
 * @returns {React.Component} - A React functional component that manages the creation, editing, and cancellation of food orders for a customer.
 */
const OrderForm = (orderRequest, customer) => {
    const [foodItem, setFoodItem] = useState('');
    const [foodOrders, setFoodOrders] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [showAddOrderModal, setShowAddOrderModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        setFoodOrders(fetchCustomerOrders());
    }, []);



    const handleAddOrder = async (orderRequest) => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/staff/createOrder`,
                {
                    orderRequest: orderRequest,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                toast.success('Order created successfully', { position: toast.POSITION.TOP_RIGHT });

                // Fetch and Update the list of orders after creating a new order
                await fetchCustomerOrders();
            } else {
                console.error('Failed to create order:', response.data);
                toast.error('Failed to create order', { position: toast.POSITION.TOP_RIGHT });
            }
        } catch (error) {
            toast.error('Error creating order', { position: toast.POSITION.TOP_RIGHT });
        }

        // Reset form state
        setSelectedItems([]);
        setShowAddOrderModal(false);
    };


    const fetchCustomerOrders = async () => {
        /**
         * Fetches a list of orders for a specific customer from a REST API.
         * 
         * @throws {Error} If there is an error during the request.
         * 
         */
        try {
            const response = await axios.get(`${apiUrl}/api/staff/finalOrderInfo`, {
                params: {
                    orderId: 2,
                },
            });
            console.log(response);
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
                <OrderTable orders={foodOrders} handleEditOrder={handleEditOrder} handleCancelOrder={handleCancelOrder} />
            ) : (
                <div>
                    <p>No orders yet</p>
                    <Button variant="primary" onClick={() => setShowAddOrderModal(true)}>
                        Add Order
                    </Button>
                </div>
            )}

            {showAddOrderModal && (
                <AddOrderForm
                    handleAddOrder={handleAddOrder}
                    handleClose={() => setShowAddOrderModal(false)}
                    setSelectedItems={setSelectedItems} />
            )}


        </div>
    )
};

export default OrderForm
