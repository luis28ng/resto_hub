import Navbar from "../components/navbar.js";

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Sample restaurant data
const restaurantData = {
  name: 'RestoHub',
  menu: [
    { id: 1, name: 'Burger', price: 10.99 },
    { id: 2, name: 'Pizza', price: 12.99 },
    { id: 3, name: 'Salad', price: 8.99 },
  ],
};

// Endpoint to get restaurant details
app.get('/api/restaurant', (req, res) => {
  res.json(restaurantData);
});

// Endpoint to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.js'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});
