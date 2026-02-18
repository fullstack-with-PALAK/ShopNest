import { createContext, useState, useContext } from 'react';

const AlertContext = createContext();

export function AlertProvider({ children }) {
    const [alert, setAlert] = useState(null);

    const showAlert = (heading, message) => {
        if (!heading || !message) return;
        
        const newAlert = {
            id: Date.now(),
            heading,
            message
        };
        setAlert(newAlert);
        
        // Auto-clear alert after 3 seconds
        setTimeout(() => setAlert(null), 3000);
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {children}
        </AlertContext.Provider>
    );
}

export const useAlert = () => useContext(AlertContext);
