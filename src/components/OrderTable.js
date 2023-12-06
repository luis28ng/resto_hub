// OrderTable.js
import React, { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from 'react-toastify';

const OrderTable = ({ foodOrders, handleDeleteOrder, handleUpdateOrderStatus }) => {
    const [showModal, setShowModal] = useState(false);
    const [newOrderStatus, setNewOrderStatus] = useState('');

    const columns = [
        { name: 'Item Name', selector: (row) => row.menuItem.name, center: true, sortable: true },
        { name: 'Description', selector: (row) => row.menuItem.description, center: true, sortable: true },
        { name: 'Price Per Item', selector: (row) => row.pricePerItem, center: true, sortable: true },
        { name: 'Quantity', selector: (row) => row.quantity, center: true, sortable: true },
        { name: 'Total Amount', selector: (row) => row.totalOrderAmount, center: true, sortable: true },
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
                    <Button onClick={() => setShowModal(true)} variant="success">
                        Update status
                    </Button>
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

    const handleUpdateOrder = async (order) => {
        try {
            if (!newOrderStatus) {
                // Show a notification or handle empty status input
                console.error('New order status is required');
                return;
            }

            // Update order status
            await handleUpdateOrderStatus(newOrderStatus);
            setShowModal(false);
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error("Failed to create new item, please try again", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };


    return (
        <Container>
            <ToastContainer />
            <DataTable data={foodOrders} columns={columns} fixedHeader striped />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Order Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="newOrderStatusSelect">
                        <Form.Label>New Order Status:</Form.Label>
                        <Form.Control
                            as="select"
                            value={newOrderStatus}
                            onChange={(e) => setNewOrderStatus(e.target.value)}
                        >
                            <option value="" disabled>
                                Select new order status
                            </option>
                            <option value="PENDING">Pending</option>
                            <option value="INPROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateOrder}>
                        Update Status
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export default OrderTable;
