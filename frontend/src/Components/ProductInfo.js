import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
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

export default function ProductInfo() {
    const { id } = useParams();
    const { showAlert } = useAlert();
    const [product, setProduct] = useState({});
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product._id) {
            fetchReviews();
        }
    }, [product]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/product/${id}`);
            if (!response.ok) throw new Error('API error');
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.log('Using demo product:', error);
            const demoProduct = demoProducts.find(p => p._id === id) || demoProducts[0];
            setProduct(demoProduct);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews?productId=${product._id}`);
            if (!response.ok) throw new Error('API error');
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.log('Demo mode - no reviews');
            setComments([]);
        }
    };

    const addToCart = async () => {
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

    const postReview = async () => {
        if (!review.trim()) {
            showAlert('Error', 'Please enter a review');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product._id,
                    rating,
                    comment: review
                })
            });
            const data = await response.json();
            showAlert(data[0], data[1]);
            if (data[0] === 'Success') {
                setReview('');
                fetchReviews();
            }
        } catch (error) {
            showAlert('Demo Mode', 'Reviews disabled in demo');
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-lg shadow-md"
                />
                
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-2xl text-green-600 font-bold mb-4">₹{product.price}</p>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    
                    <div className="flex gap-4">
                        <button
                            onClick={addToCart}
                            className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                        >
                            Add to Cart
                        </button>
                        <button className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                
                <div className="mb-6">
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="mr-4 p-2 border rounded-lg"
                    >
                        {[5, 4, 3, 2, 1].map(n => (
                            <option key={n} value={n}>{n} Stars</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={review}
                        placeholder="Write your review..."
                        onChange={(e) => setReview(e.target.value)}
                        className="w-64 p-2 border rounded-lg mr-4"
                    />
                    <button
                        onClick={postReview}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                    >
                        Submit Review
                    </button>
                </div>

                <div className="space-y-4">
                    {comments.map((comment, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">{comment.userName}</span>
                                <span className="text-yellow-500">{'★'.repeat(comment.rating)}</span>
                            </div>
                            <p className="text-gray-600">{comment.comment}</p>
                        </div>
                    ))}
                    {comments.length === 0 && (
                        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                    )}
                </div>
            </div>
        </div>
    );
}
