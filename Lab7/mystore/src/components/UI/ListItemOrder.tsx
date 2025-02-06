import React from 'react';
import { ItemOrder } from './ItemOrder';

interface ListItemOrderProps {
    items: {
        id: number;
        name: string;
        quantity: number;
        price: number;
    }[];
    maxHeight?: string;
    maxWidth?: string;
    position?: string;
    className?: string;
}

export const ListItemOrder: React.FC<ListItemOrderProps> = ({
    items = [],
    maxHeight = "500px",
    maxWidth = "1200px",
    position = "center",
    className = ''
}) => {
    const positionClasses = {
        center: "justify-center items-center",
        left: "justify-start items-start", 
        right: "justify-end items-start"
    };

    if (!items || items.length === 0) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 text-lg">No items found</p>
            </div>
        );
    }

    return (
        <div
            className={`flex flex-col overflow-y-auto ${positionClasses[position as keyof typeof positionClasses]} ${className}`}
            style={{ maxHeight, maxWidth }}
        >
            <div className="grid grid-cols-4 gap-8 px-4 py-3 bg-gray-100 font-bold text-lg">
                <div>Item</div>
                <div className="ml-[10px]">Name</div>
                <div className="ml-[10px]">Quantity</div>
                <div className="ml-[10px]">Price</div>
            </div>

            <div className="flex flex-col gap-2 p-4">
                {items.map((item, index) => (
                    <ItemOrder
                        key={index}
                        id={item.id}
                        quantity={item.quantity}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};
