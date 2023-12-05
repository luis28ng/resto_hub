// OrderTable.js
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import DataTable from "react-data-table-component";

const OrderTable = ({ foodOrders, handleCancelOrder }) => {
    const columns = [
        { name: 'Item Name', selector: (row) => row.menuItem.name, center: true, sortable: true },
        { name: 'Description', selector: (row) => row.menuItem.description, center: true, sortable: true },
        { name: 'Price Per Item', selector: (row) => row.pricePerItem, center: true, sortable: true },
        { name: 'Quantity', selector: (row) => row.quantity, center: true, sortable: true },
        { name: 'Subtotal', selector: (row) => row.subTotal, center: true, sortable: true },
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
                    <Button onClick={handleCancelOrder} variant="danger">
                        Cancer Order
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
