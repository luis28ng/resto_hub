// OrderTable.js
import React, { useState } from 'react';
import { Button, Container, Modal, Form } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = 'http://restohub-api.us-east-2.elasticbeanstalk.com';

const OrderTable = ({ foodOrders, reservationCode, setFoodOrders }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedReservationCode, setSelectedReservationCode] = useState('');

    const handleOpenModal = (row) => {
        console.log(foodOrders.reservationCode)
        setSelectedStatus(row.orderStatus);
        setSelectedReservationCode(foodOrders.reservationCode);
        setShowModal(true);
    };

    const fetchCustomerOrders = async (reservationCode) => { // Define fetchCustomerOrders
        try {
            const response = await axios.get(`${apiUrl}/api/staff/getOrder`, {
                params: {
                    reservationCode: reservationCode,
                },
            });
            setFoodOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            // Handle error as needed
        }
    };

    const handleUpdateOrderStatus = async () => {
        try {
            const response = await axios.put(
                `${apiUrl}/api/staff/updateOrderStatus`,
                {},
                {
                    params: {
                        reservationCode: selectedReservationCode,
                        orderStatus: selectedStatus,
                    },
                }
            );

            if (response.status === 200) {
                toast.success('Order status updated successfully', { position: toast.POSITION.TOP_RIGHT });
                await fetchCustomerOrders(selectedReservationCode,);
                handleCloseModal();
            } else {
                console.error('Failed to update order status:', response.data);
                toast.error('Failed to update order status', { position: toast.POSITION.TOP_RIGHT });
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Error updating order status', { position: toast.POSITION.TOP_RIGHT });
        }
    };

    const handleDeleteOrder = async () => {
        setSelectedReservationCode(foodOrders.reservationCode)
        console.log(selectedReservationCode)
        const isConfirmed = window.confirm('Are you sure you want to delete this order?');
        if (isConfirmed) {
            try {
                const response = await axios.delete(`${apiUrl}/api/staff/deleteOrder`, {
                    params: {
                        reservationCode: selectedReservationCode,
                    },
                });

                if (response.status === 200) {
                    toast.success('Order deleted successfully', { position: toast.POSITION.TOP_RIGHT });
                    await fetchCustomerOrders(selectedReservationCode);
                    handleCloseModal();

                } else {
                    console.error('Failed to delete order:', response.data);
                    toast.error('Failed to delete order', { position: toast.POSITION.TOP_RIGHT });
                }
            } catch (error) {
                console.error('Error deleting order:', error);
                toast.error('Error deleting order', { position: toast.POSITION.TOP_RIGHT });
            }
        } else {
            // User canceled the deletion
            console.log('Order deletion canceled');
        }
    };


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const columns = [
        { name: 'Item Name', selector: (row) => row.menuItem.name, center: true, sortable: true },
        { name: 'Description', selector: (row) => row.menuItem.description, center: true, sortable: true },
        { name: 'Price Per Item', selector: (row) => row.pricePerItem, center: true, sortable: true },
        { name: 'Quantity', selector: (row) => row.quantity, center: true, sortable: true },
        { name: 'Total Amount', selector: () => foodOrders.totalOrderAmount, center: true, sortable: true },
        {
            name: 'Status',
            selector: () => foodOrders.orderStatus,
            center: true, sortable: true,
            cell: (row) => (
                <span style={{ color: foodOrders.orderStatus === 'COMPLETED' ? 'green' : 'red' }}>
                    {foodOrders.orderStatus}
                </span>
            ),
        },
        {
            name: '',
            cell: (row) => (
                <Container style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button onClick={() => handleOpenModal(row)} variant="success">
                        Update status
                    </Button>

                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Order Status</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Select Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="INPROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                </Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleUpdateOrderStatus}>
                                Update
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            ),
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: '',
            cell: (row) => (
                <Container style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button onClick={handleDeleteOrder} variant="danger">
                        Delete Order
                    </Button>
                </Container>
            ),
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <Container>
            <DataTable data={foodOrders.orderItems} columns={columns} fixedHeader striped />
        </Container>
    );
};

export default OrderTable;