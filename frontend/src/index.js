import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router';
import { SearchProvider } from './SearchContext';
import { AlertProvider } from './AlertContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <React.StrictMode>
            <AlertProvider>
                <SearchProvider>
                    <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto font-sans text-black bg-white">
                        <App />
                    </div>
                </SearchProvider>
            </AlertProvider>
        </React.StrictMode>
    </HashRouter>
);
