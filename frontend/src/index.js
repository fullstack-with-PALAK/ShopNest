import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <React.StrictMode>
            <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto font-sans text-black bg-white">
                <App />
            </div>
        </React.StrictMode>
    </HashRouter>
);
