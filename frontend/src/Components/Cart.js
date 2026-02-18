import { useEffect, useState } from 'react';
import { useAlert } from '../AlertContext';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const { showAlert } = useAlert();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setCart(data || []);
        } catch (error) {
            console.log(error);
            showAlert('Error', 'Failed to fetch cart');
        }
    };

    const removeItem = async (itemId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/${itemId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await response.json();
            showAlert(data[0], data[1]);
            fetchCart();
        } catch (error) {
            console.log(error);
            showAlert('Error', 'Failed to remove item');
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            return total + (item.cartItem?.[0]?.price || 0);
        }, 0);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            
            {cart.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-xl text-gray-500">Your cart is empty</p>
                    <a href="/#/" className="text-blue-500 hover:underline mt-4 inline-block">
                        Continue Shopping
                    </a>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={item._id} className="flex gap-4 p-4 border rounded-lg shadow-sm">
                                <img
                                    src={item.cartItem?.[0]?.image}
                                    alt={item.cartItem?.[0]?.name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{item.cartItem?.[0]?.name}</h3>
                                    <p className="text-green-600 font-bold">₹{item.cartItem?.[0]?.price}</p>
                                    <p className="text-gray-500 text-sm truncate">{item.cartItem?.[0]?.description}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                                        Buy Now
                                    </button>
                                    <button
                                        onClick={() => removeItem(item._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center text-xl font-bold">
                            <span>Total:</span>
                            <span className="text-green-600">₹{calculateTotal()}</span>
                        </div>
                        <button className="w-full mt-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
