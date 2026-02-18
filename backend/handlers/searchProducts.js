const { productModel } = require('../schemas/products');

const searchProducts = async (req, res) => {
    const { search } = req.body;
    
    try {
        const products = await productModel.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        });
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json(['Error', 'Search failed']);
    }
};

module.exports = searchProducts;
