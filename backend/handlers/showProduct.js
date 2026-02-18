const { productModel } = require('../schemas/products');

const showProduct = async (req, res) => {
    try {
        const { id } = req.params;
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
