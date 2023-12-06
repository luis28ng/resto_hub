import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import AddOrderForm from './AddOrderForm';
import OrderTable from './src/components/OrderTable';

import 'react-toastify/dist/ReactToastify.css';

const apiUrl = 'http://restohub-api.us-east-2.elasticbeanstalk.com';

const OrderForm = ({ customer }) => {
    const [foodItem, setFoodItem] = useState('');
    const [foodOrders, setFoodOrders] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [showAddOrderModal, setShowAddOrderModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [reservationCode, setReservationCode] = useState('');

    useEffect(() => {
        if (customer && customer.reservationCode) {
            setReservationCode(customer.reservationCode);
        }
    }, [customer]);

    useEffect(() => {
        const fetchData = async () => {
            if (reservationCode) {
                try {
                    const response = await axios.get(`${apiUrl}/api/staff/getOrder`, {
                        params: {
                            reservationCode: reservationCode,
                        },
                    });
                    setFoodOrders(response.data);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                    toast.error('Error fetching orders', { position: toast.POSITION.TOP_RIGHT });
                    setFoodOrders([]);
                }
            }
        };

        fetchData();
    }, [reservationCode]);

    const handleAddOrder = async (orderRequest) => {
        try {
            const response = await axios.post(`${apiUrl}/api/staff/createOrder`,
                {
                    reservationCode: orderRequest.reservationCode,
                    orderStatus: orderRequest.orderStatus,
                    instructions: orderRequest.instructions,
                    restaurantId: orderRequest.restaurantId,
                    orderItems: orderRequest.orderItems,
                },
            );

            if (response.status === 201) {
                toast.success('Order created successfully', { position: toast.POSITION.TOP_RIGHT });
                await fetchCustomerOrders(reservationCode);
            } else {
                console.log('backend responded with: ', response);
                console.error('Failed to create order:', response.data);
                toast.error('Failed to create order', { position: toast.POSITION.TOP_RIGHT });
            }
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error('Error creating order', { position: toast.POSITION.TOP_RIGHT });
        }

        setSelectedItems([]);
        setShowAddOrderModal(false);
    };

    const fetchCustomerOrders = async (code) => {
        try {
            const response = await axios.get(`${apiUrl}/api/staff/getOrder`, {
                params: {
                    reservationCode: code,
                },
            });
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

    const handleUpdateOrderStatus = async (newOrderStatus) => {
        try {
            const response = await axios.put(
                `${apiUrl}/api/staff/updateOrderStatus`,
                {
                    reservationCode: reservationCode,
                    orderStatus: newOrderStatus,
                }
            );

            if (response.status === 200) {
                toast.success('Order status updated successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                });

                // Fetch updated orders after status update
                await fetchCustomerOrders(reservationCode);
            } else {
                console.error('Failed to update order status:', response.data);
                toast.error('Failed to update order status', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Error updating order status', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    return (
        <div>
            {foodOrders.length !== 0 ? (
                <OrderTable
                    orders={foodOrders}
                    handleEditOrder={handleEditOrder}
                    handleCancelOrder={handleCancelOrder}
                    handleUpdateOrderStatus={handleUpdateOrderStatus}

                />
            ) : (
                <div>
                    <p>No orders yet</p>
                    <Button variant="primary" onClick={() => setShowAddOrderModal(true)}>
                        Add Order
                    </Button>
                </div>
            )}
        </div>
    );
};

export default OrderForm;
