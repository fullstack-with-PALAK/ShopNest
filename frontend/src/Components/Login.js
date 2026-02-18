import { useState } from 'react';
import { useAlert } from '../AlertContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { showAlert } = useAlert();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            showAlert('Error', 'Please fill all fields');
            return;
        }
        
        if (password.length < 8) {
            showAlert('Error', 'Password must be at least 8 characters');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            showAlert(data[0], data[1]);
            
            if (data[0] === 'Success') {
                setEmail('');
                setPassword('');
                window.location.href = '/#/';
            }
        } catch (error) {
            showAlert('Error', 'Login failed. Please try again.');
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    
                    <button
                        type="submit"
                        className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        Log In
                    </button>
                </form>
                
                <p className="text-center mt-4">
                    Don't have an account? <a href="/#/signup" className="text-blue-500 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
}
