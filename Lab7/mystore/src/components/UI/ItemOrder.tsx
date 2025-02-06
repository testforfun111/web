import React from 'react';

interface ItemOrderProps {
    id: number;
    quantity: number;
    name: string;
    price: number;
}

export const ItemOrder: React.FC<ItemOrderProps> = ({ id, quantity, name, price }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-200 gap-5">
            <div className="flex items-center gap-4 mb-2 md:mb-0">
                <span className="text-gray-600">#{id}</span>
                <span className="text-gray-800 flex justify-center w-[100px] font-medium ml-[80px]">{name}</span>
                <span className="text-gray-600 w-[80px] text-sm ml-[60px]">{quantity}</span>
                <span className="text-gray-600 w-[80px] text-sm ml-[10px]">${price}</span>
            </div>
        </div>
    );
};
