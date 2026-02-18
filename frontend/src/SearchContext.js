import { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const search = async (query) => {
        setSearchQuery(query);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/searchProducts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ search: query })
            });
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.log('Search error:', error);
            setSearchResults([]);
        }
    };

    return (
        <SearchContext.Provider value={{ searchResults, searchQuery, search, setSearchResults }}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearch = () => useContext(SearchContext);
