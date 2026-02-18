import { useState, useEffect } from 'react';

export default function Alert({ heading, message, onClose }) {
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setFade(false);
        }, 2000);

        const closeTimer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(closeTimer);
        };
    }, [onClose]);

    const bgColor = heading.toLowerCase() === 'error' ? 'bg-red-500' : 'bg-green-500';
    const animation = fade ? 'animate-fadeIn' : 'animate-fadeOut';

    return (
        <div className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg z-50 ${bgColor} ${animation}`}>
            <h3 className="text-xl font-bold text-white">{heading}</h3>
            <p className="text-white mt-2">{message}</p>
        </div>
    );
}
