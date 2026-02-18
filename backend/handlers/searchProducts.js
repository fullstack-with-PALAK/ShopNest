const { productModel } = require('../schemas/products');
const { mockProducts, isDemoMode } = require('../mockData');

const searchProducts = async (req, res) => {
    const { search } = req.body;
    
    try {
        // Return filtered mock data in demo mode
        if (isDemoMode()) {
            const searchLower = search.toLowerCase();
            const filtered = mockProducts.filter(p => 
                p.title.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower)
            );
            return res.status(200).json(filtered);
        }
        
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
