import { Link, Route, Routes } from 'react-router';
import Search from './Components/Search';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import ProductList from './Components/ProductList';
import ProductForm from './Components/ProductForm';
import ProductInfo from './Components/ProductInfo';
import Cart from './Components/Cart';
import Results from './Components/Results';
import AlertWrapper from './Components/AlertWrapper';

export default function App() {
    return (
        <AlertWrapper>
            <div className="overflow-y-hidden h-screen">
                {/* Navigation Bar */}
                <nav className="sticky top-0 z-50 h-16 px-5 w-full bg-black text-white flex items-center justify-around">
                    <Link to="/">
                        <span className="text-xl font-bold">ShopNest</span>
                    </Link>
                    <Search />
                    <div className="flex gap-6">
                        <Link to="/">
                            <button className="hover:text-gray-300">Home</button>
                        </Link>
                        <Link to="/product/add">
                            <button className="hover:text-gray-300">Sell</button>
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

                {/* Main Content */}
                <div className="overflow-y-auto h-[calc(100vh-4rem)]">
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/product/add" element={<ProductForm />} />
                        <Route path="/product/:id" element={<ProductInfo />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/search" element={<Results />} />
                    </Routes>
                </div>
            </div>
        </AlertWrapper>
    );
}
