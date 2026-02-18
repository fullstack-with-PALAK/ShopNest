const Cart = require('../schemas/cart');
const { isDemoMode } = require('../mockData');

const addToCart = async (req, res) => {
    try {
        // In demo mode, just return success (cart won't persist)
        if (isDemoMode()) {
            return res.status(200).json(['Demo Mode', 'Cart functionality disabled in demo']);
        }
        
        const { cartItem } = req.body;
        const userName = req.user.name;
        
        const newCartItem = new Cart({
            user: userName,
            cartItem: cartItem
        });
        
        await newCartItem.save();
        res.status(200).json(['Success', 'Product added to cart']);
    } catch (error) {
        console.log(error);
        res.status(500).json(['Error', 'Failed to add to cart']);
    }
};

module.exports = addToCart;
