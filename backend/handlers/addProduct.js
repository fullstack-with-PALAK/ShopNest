const { productModel } = require('../schemas/products');
require('dotenv').config();

const addProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const imageURL = req.file.filename;
        
        const product = new productModel({
            name,
            price,
            description,
            image: `${process.env.REACT_APP_BACKEND_URL}/images/${imageURL}`
        });
        
        await product.save();
        res.status(200).json(['Success', 'Product added successfully']);
    } catch (error) {
        console.log(error);
        res.status(500).json(['Error', 'Failed to add product']);
    }
};

module.exports = addProduct;
