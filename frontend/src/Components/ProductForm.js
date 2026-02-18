import { useState } from 'react';
import { useAlert } from '../AlertContext';

export default function ProductForm() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const { showAlert } = useAlert();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name || !price || !description || !image) {
            showAlert('Error', 'Please fill all fields');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            
            const data = await response.json();
            showAlert(data[0], data[1]);
            
            if (data[0] === 'Success') {
                setName('');
                setPrice('');
                setDescription('');
                setImage(null);
            }
        } catch (error) {
            showAlert('Error', 'Failed to add product');
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Add Product</h1>
                <p className="text-gray-500 text-center mb-6">Retailers only</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        placeholder="Product name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    
                    <input
                        type="number"
                        value={price}
                        placeholder="Price in ₹"
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    
                    <textarea
                        value={description}
                        placeholder="Product description"
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    />
                    
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    
                    <button
                        type="submit"
                        className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}
