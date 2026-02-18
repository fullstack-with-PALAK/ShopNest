import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useAlert } from '../AlertContext';

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
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews?productId=${product._id}`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.log(error);
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
            showAlert('Error', 'Failed to add to cart');
            console.log(error);
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
            showAlert('Error', 'Failed to submit review');
            console.log(error);
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
