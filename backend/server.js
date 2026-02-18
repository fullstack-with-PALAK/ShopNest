const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { body, validationResult } = require('express-validator');
const connect = require('./connect');
const { signup, login } = require('./handlers/auth');
const { verifyToken } = require('./handlers/jwts');
const checkRole = require('./handlers/checkRole');
const upload = require('./handlers/upload');
const addProduct = require('./handlers/addProduct');
const listProducts = require('./handlers/listProducts');
const addToCart = require('./handlers/addToCart');
const showCart = require('./handlers/showCart');
const deleteCart = require('./handlers/deleteCart');
const searchProducts = require('./handlers/searchProducts');
const showProduct = require('./handlers/showProduct');
const saveComment = require('./handlers/saveComment');
const showReview = require('./handlers/showReview');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.REACT_APP_FRONTEND_URL,
    credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, 'handlers', 'images')));

// Database connection
connect('shopnest')
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err);
    });

// Auth routes
app.post('/signup', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('role').notEmpty().withMessage('Role is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await signup(req, res);
});

app.post('/login', [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await login(req, res);
});

// Product routes
app.post('/products', verifyToken, checkRole('Retailer'), upload.single('image'), async (req, res) => {
    await addProduct(req, res);
});

app.get('/products', async (req, res) => {
    await listProducts(req, res);
});

app.post('/searchProducts', async (req, res) => {
    await searchProducts(req, res);
});

// Cart routes
app.post('/cart', verifyToken, async (req, res) => {
    await addToCart(req, res);
});

app.get('/cart', verifyToken, async (req, res) => {
    await showCart(req, res);
});

app.delete('/cart/:id', verifyToken, async (req, res) => {
    await deleteCart(req, res);
});

// Review routes
app.post('/reviews', verifyToken, async (req, res) => {
    await saveComment(req, res);
});

app.get('/reviews', async (req, res) => {
    await showReview(req, res);
});

// Single product route
app.get('/:id', async (req, res) => {
    await showProduct(req, res);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
