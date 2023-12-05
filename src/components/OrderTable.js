// OrderTable.js
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import DataTable from "react-data-table-component";

const OrderTable = ({ foodOrders, handleUpdateOrder, handleDeleteOrder }) => {
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
                    <Button onClick={handleUpdateOrder} variant="success">
                        Update Order
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

    return (
        <Container>
            <DataTable data={foodOrders} columns={columns} fixedHeader striped />
        </Container>
    );
};

export default OrderTable;
