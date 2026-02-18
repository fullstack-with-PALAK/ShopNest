const Cart = require('../schemas/cart');

const addToCart = async (req, res) => {
    try {
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
