// OrderForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const OrderForm = ({ customer }) => {
    const [foodItem, setFoodItem] = useState('');
    const [foodOrders, setFoodOrders] = useState(customer.foodOrders || []);

    const handleAddOrder = () => {
        if (foodItem.trim() !== '') {
            setFoodOrders([...foodOrders, foodItem]);
            setFoodItem('');
        }
    };

    const handleRemoveOrder = (index) => {
        const updatedOrders = [...foodOrders];
        updatedOrders.splice(index, 1);
        setFoodOrders(updatedOrders);
    };

    // Add logic for editing orders if needed

    return (
        <div>
            <Form>
                <Form.Group controlId="formFoodItem">
                    <Form.Label>Food Item</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter food item"
                        value={foodItem}
                        onChange={(e) => setFoodItem(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleAddOrder}>
                    Add Order
                </Button>
            </Form>

            <ul>
                {foodOrders.map((order, index) => (
                    <li key={index}>
                        {order}
                        <Button variant="danger" onClick={() => handleRemoveOrder(index)}>
                            Remove
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderForm;
