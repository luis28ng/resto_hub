import Navbar from "../components/navbar.js";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Mock data for a restaurant menu
const menu = [
  { id: 1, name: 'Burger', price: 10 },
  { id: 2, name: 'Pizza', price: 15 },
  { id: 3, name: 'Salad', price: 8 },
];

// Endpoint to get the menu
app.get('/menu', (req, res) => {
  res.json(menu);
});

// Endpoint to place an order
app.post('/order', (req, res) => {
  const order = req.body;
  // Assuming the order is an array of menu item IDs
  const orderedItems = menu.filter(item => order.includes(item.id));

  if (orderedItems.length === 0) {
    res.status(400).json({ error: 'Invalid order' });
  } else {
    const total = orderedItems.reduce((sum, item) => sum + item.price, 0);
    res.json({ success: true, total: total });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:3000`);
});
