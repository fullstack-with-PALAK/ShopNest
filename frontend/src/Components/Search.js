import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../SearchContext';
import { useAlert } from '../AlertContext';

export default function Search() {
    const [input, setInput] = useState('');
    const { search } = useSearch();
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const handleSearch = async () => {
        if (!input.trim()) {
            showAlert('Error', 'Please enter a search term');
            return;
        }

        await search(input);
        navigate('/search');
        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex gap-2">
            <input
                type="search"
                value={input}
                placeholder="Search products..."
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="px-4 py-2 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
                Search
            </button>
        </div>
    );
}
