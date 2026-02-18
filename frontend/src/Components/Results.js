import { useContext } from "react";
import { SearchContext } from "../SearchContext";
import { useAlert } from "../AlertContext";

export default function Results() {
    const { showAlert } = useAlert();
    const { res } = useContext(SearchContext);

    const addToCart = (product) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                cartItem: [{
                    image: product.image,
                    name: product.name,
                    price: product.price,
                    description: product.description
                }]
            })
        })
        .then((res) => res.json())
        .then((data) => {
            showAlert(data[0], data[1]);
        })
        .catch((err) => {
            showAlert("Error", "Failed to add item to cart");
            console.log(err);
        });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Search Results</h1>
            
            {res.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-xl text-gray-500">No products found</p>
                    <a href="/#/" className="text-blue-500 hover:underline mt-4 inline-block">
                        Browse All Products
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {res.map((product, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                <p className="text-green-600 font-bold text-xl mb-2">₹{product.price}</p>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
                                <div className="flex gap-2">
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
