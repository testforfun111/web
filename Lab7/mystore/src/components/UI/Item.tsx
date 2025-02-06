import React from 'react';

interface ItemProps {
    id: number;
    src: string;
    name: string;
    onClick: () => void;
}

export const Item: React.FC<ItemProps> = ({ src, name, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className="w-[10rem] h-[12rem] flex flex-col items-center justify-between p-2 hover:bg-gray-50 cursor-pointer transition-colors rounded-lg"
            role="button"
            tabIndex={0}
        >
            <img 
                src={src ? `http://localhost:5173/${src}` : '/profile.jpg'} 
                alt={`${name}'s avatar`}
                className="w-full h-[9rem] object-cover rounded-lg"
            />
            <span className="text-gray-800 text-lg">{name}</span>
        </div>
    );
};
