const { productModel } = require('../schemas/products');
const { mockProducts, isDemoMode } = require('../mockData');

const listProducts = async (req, res) => {
    try {
        // Return mock data in demo mode
        if (isDemoMode()) {
            return res.status(200).json(mockProducts);
        }
        
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        // Fallback to mock data on error
        if (isDemoMode()) {
            return res.status(200).json(mockProducts);
        }
        res.status(500).json(['Error', 'Failed to fetch products']);
    }
};

module.exports = listProducts;
