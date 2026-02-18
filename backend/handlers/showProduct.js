const { productModel } = require('../schemas/products');
const { mockProducts, isDemoMode } = require('../mockData');

const showProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Return mock data in demo mode
        if (isDemoMode()) {
            const product = mockProducts.find(p => p._id === id);
            if (!product) {
                return res.status(404).json(['Error', 'Product not found']);
            }
            return res.status(200).json(product);
        }
        
        const product = await productModel.findById(id);
        
        if (!product) {
            return res.status(404).json(['Error', 'Product not found']);
        }
        
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json(['Error', 'Failed to fetch product']);
    }
};

module.exports = showProduct;
