import { Link, Route, Routes } from 'react-router';

export default function App() {
    return (
        <div className="overflow-y-hidden h-screen">
            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 h-16 px-5 w-full bg-black text-white flex items-center justify-around">
                <Link to="/">
                    <span className="text-xl font-bold">ShopNest</span>
                </Link>
                <div className="flex gap-6">
                    <Link to="/">
                        <button className="hover:text-gray-300">Home</button>
                    </Link>
                    <Link to="/signup">
                        <button className="hover:text-gray-300">Sign Up</button>
                    </Link>
                    <Link to="/login">
                        <button className="hover:text-gray-300">Log In</button>
                    </Link>
                    <Link to="/cart">
                        <button className="hover:text-gray-300">Cart</button>
                    </Link>
                </div>
            </nav>

            {/* Routes */}
            <Routes>
                <Route path="/" element={<div className="p-8 text-center">Welcome to ShopNest!</div>} />
                <Route path="/signup" element={<div className="p-8">Sign Up Page</div>} />
                <Route path="/login" element={<div className="p-8">Login Page</div>} />
                <Route path="/cart" element={<div className="p-8">Cart Page</div>} />
            </Routes>
        </div>
    );
}
