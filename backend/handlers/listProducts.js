const { productModel } = require('../schemas/products');

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json(['Error', 'Failed to fetch products']);
    }
};

module.exports = listProducts;
