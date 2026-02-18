const express = require('express');
const cors = require('cors');
const connect = require('./connect');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connect('shopnest')
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err);
    });

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to ShopNest API' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
