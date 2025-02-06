import React from 'react';

export interface ErrorAlertProps {
    message: string;
    onClick: () => void;
}

export const Error: React.FC<ErrorAlertProps> = ({ message, onClick }) => {
    return (
        <div 
            className="bg-red-50 border border-red-400 rounded-lg p-4 mb-4"
            role="alert" 
            aria-live="polite"
        >
            <p className="text-red-700 mb-2 flex justify-center">{message}</p>
            <button 
                onClick={onClick}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
                ОК
            </button>
        </div>
    );
}