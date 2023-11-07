import Navbar from "../components/navbar.js";
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const WaiterDashBoard = () => {
    return(
        <div>
            <Navbar />
            <h1>Customer order dashboard</h1>
        </div>
    );
}  

const express = require('express');
const app = express();
const port = 3000;

// Simulated database for customer orders
const orders = [];

app.use(express.json()); // Parse JSON request bodies

// Route to create a new order for a customer when they check-in
app.post('/checkin', (req, res) => {
  const newOrder = {
    customerId: req.body.customerId,
    items: [],
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Route for staff to access the customer order on the staff dashboard
app.get('/staffDashboard/customerOrder/:orderId', (req, res) => {
  const orderId = parseInt(req.params.orderId);
  const order = orders.find((order) => order.customerId === orderId);

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Route to add a food item to an existing order
app.post('/staffDashboard/customerOrder/:orderId/addFoodItem', (req, res) => {
  const orderId = parseInt(req.params.orderId);
  const foodItem = req.body.foodItem;

  const order = orders.find((order) => order.customerId === orderId);

  if (order) {
    order.items.push(foodItem);
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Route to edit a food item in an existing order
app.put('/staffDashboard/customerOrder/:orderId/editFoodItem/:itemId', (req, res) => {
  const orderId = parseInt(req.params.orderId);
  const itemId = parseInt(req.params.itemId);

  const order = orders.find((order) => order.customerId === orderId);

  if (order) {
    const foodItem = order.items.find((item) => item.id === itemId);
    if (foodItem) {
      foodItem.name = req.body.name;
      foodItem.price = req.body.price;
      res.json(order);
    } else {
      res.status(404).json({ error: 'Food item not found' });
    }
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Route to remove a food item from an existing order
app.delete('/staffDashboard/customerOrder/:orderId/removeFoodItem/:itemId', (req, res) => {
  const orderId = parseInt(req.params.orderId);
  const itemId = parseInt(req.params.itemId);

  const order = orders.find((order) => order.customerId === orderId);

  if (order) {
    const itemIndex = order.items.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      order.items.splice(itemIndex, 1);
      res.json(order);
    } else {
      res.status(404).json({ error: 'Food item not found' });
    }
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


export default WaiterDashBoard;
