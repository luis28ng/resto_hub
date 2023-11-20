// CustomerTable.js
import React, { useState } from 'react';

import { Button, Modal, Table } from 'react-bootstrap';

import OrderForm from './OrderForm';

const CustomerTable = ({ customers }) => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);

    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer);
        setShowOrderModal(true);
    };

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Table Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.tableNumber}</td>
                            <td>
                                <Button onClick={() => handleSelectCustomer(customer)}>View Orders</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {selectedCustomer && (
                <Modal show={showOrderModal} onHide={() => setShowOrderModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{`Food Orders for ${selectedCustomer.name}`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <OrderForm customer={selectedCustomer} />
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default CustomerTable;
