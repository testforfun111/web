import React from 'react';

interface CartTitleProps {
    title: string;
    width?: string;
    fontSize?: string;
}

export const CartTitle: React.FC<CartTitleProps> = ({ title, width = "70%", fontSize = "2.25rem" }) => {
    return (
        <div className="bg-[#F56F18] p-3 rounded-lg" style={{ width }}>
            <h1 className="text-center font-bold" style={{ fontSize }}>{title}</h1>
        </div>
    );
};
