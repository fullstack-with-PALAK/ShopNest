import { useState } from 'react';
import { useAlert } from '../AlertContext';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const { showAlert } = useAlert();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name || !email || !password || !role) {
            showAlert('Error', 'Please fill all fields');
            return;
        }
        
        if (password.length < 8) {
            showAlert('Error', 'Password must be at least 8 characters');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, role, password })
            });
            
            const data = await response.json();
            showAlert(data[0], data[1]);
            
            if (data[0] === 'Success') {
                setName('');
                setEmail('');
                setPassword('');
                setRole('');
            }
        } catch (error) {
            showAlert('Error', 'Sign up failed. Please try again.');
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    
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
                    
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="">Select your role</option>
                        <option value="Consumer">Consumer</option>
                        <option value="Retailer">Retailer</option>
                    </select>
                    
                    <button
                        type="submit"
                        className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        Sign Up
                    </button>
                </form>
                
                <p className="text-center mt-4">
                    Already have an account? <a href="/#/login" className="text-blue-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}
