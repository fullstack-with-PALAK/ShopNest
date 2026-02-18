import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Search from './Search';
import { useAlert } from '../AlertContext';

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
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
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
            showAlert('Error', 'Failed to add item to cart');
            console.log(error);
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
                            onClick={() => navigate(`/${product._id}`)}
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
