const Cart = require('../schemas/cart');

const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        await Cart.findByIdAndDelete(id);
        res.status(200).json(['Success', 'Item removed from cart']);
    } catch (error) {
        console.log(error);
        res.status(500).json(['Error', 'Failed to remove item from cart']);
    }
};

module.exports = deleteCart;
