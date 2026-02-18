const Cart = require('../schemas/cart');

const showCart = async (req, res) => {
    try {
        const cartItems = await Cart.find({ user: req.user.name });
        res.status(200).json(cartItems);
    } catch (error) {
        console.log(error);
        res.status(500).json(['Error', 'Failed to fetch cart']);
    }
};

module.exports = showCart;
