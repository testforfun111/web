import React from 'react';

interface InfoStoreProps {
    imageUrl: string;
    label: string;
}

export const InfoStore: React.FC<InfoStoreProps> = ({ imageUrl="./logo.png", label="Welcome to our store" }) => {
    return (
        <div className="flex flex-col items-center gap-6">
            <img 
                src={imageUrl} 
                alt={label}
                className="w-[20rem] h-[20rem] object-cover rounded-lg"
            />
            <span className="text-gray-700 text-[30px] font-bold">
                {label}
            </span>
        </div>
    );
};
