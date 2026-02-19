import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Search from './Search';
import { useAlert } from '../AlertContext';

// Demo products for static deployment
const demoProducts = [
    { _id: '1', name: 'Wireless Bluetooth Headphones', description: 'Premium quality wireless headphones with noise cancellation, 30-hour battery life.', price: 79.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
    { _id: '2', name: 'Classic Leather Wallet', description: 'Genuine leather bifold wallet with multiple card slots and RFID blocking.', price: 34.99, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400' },
    { _id: '3', name: 'Smart Fitness Watch', description: 'Track your health with heart rate monitor, step counter, and sleep tracking.', price: 149.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
    { _id: '4', name: 'Organic Coffee Beans', description: 'Premium arabica coffee beans from Colombia. Rich, smooth flavor.', price: 18.99, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400' },
    { _id: '5', name: 'Minimalist Backpack', description: 'Water-resistant backpack with laptop compartment for work or travel.', price: 59.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' },
    { _id: '6', name: 'Stainless Steel Water Bottle', description: 'Eco-friendly insulated bottle keeps drinks cold 24hrs or hot 12hrs.', price: 24.99, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400' },
    { _id: '7', name: 'Wireless Phone Charger', description: 'Fast wireless charging pad compatible with all Qi-enabled devices.', price: 29.99, image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400' },
    { _id: '8', name: 'Essential Oils Set', description: 'Set of 6 pure essential oils: lavender, eucalyptus, peppermint, tea tree, lemon, orange.', price: 22.99, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400' }
];

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) throw new Error('API error');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log('Using demo products:', error);
            setProducts(demoProducts);
        }
    };

    const addToCart = async (product) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cartItem: [{
                        image: product.image,
                        name: product.name,
                        price: product.price,
                        description: product.description
                    }]
                })
            });
            const data = await response.json();
            showAlert(data[0], data[1]);
        } catch (error) {
            showAlert('Demo Mode', 'Cart feature disabled in demo');
        }
    };

    return (
        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
            <div className="flex justify-center mb-6">
                <Search />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">Product Listings</h1>
            <p className="text-gray-600 mb-6">Discover amazing products from our collection</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg cursor-pointer"
                            onClick={() => navigate(`/product/${product._id}`)}
                        />
                        <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>
                        <p className="text-green-600 font-bold">₹{product.price}</p>
                        <p className="text-gray-500 text-sm truncate">{product.description}</p>
                        
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                            >
                                Add to Cart
                            </button>
                            <button className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {products.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No products available</p>
            )}
        </div>
    );
}
