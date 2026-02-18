import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router';
import { SearchProvider } from './SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <React.StrictMode>
            <SearchProvider>
                <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto font-sans text-black bg-white">
                    <App />
                </div>
            </SearchProvider>
        </React.StrictMode>
    </HashRouter>
);
