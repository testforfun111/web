import React from 'react';
import { ItemCart } from './ItemCart';

interface ListItemProps {
    items: {
        itemcartid: number;
        name: string;
        price: number;
        quantity: number;
        Delete?: () => void;
        Add?: () => void;
    }[];
    maxHeight?: string;
    maxWidth?: string;
    position?: string;
    className?: string;
}

export const ListItemCart: React.FC<ListItemProps> = ({ 
    items,
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

    return (
        <div 
            className={`flex flex-col overflow-y-auto ${positionClasses[position as keyof typeof positionClasses]} ${className}`}
            style={{ maxHeight, maxWidth }}
        >
            <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-gray-100 font-bold text-lg">
                <div className='w-[100px]'>ID</div>
                <div className='w-[200px] -translate-x-[70px]'>Product</div>
                <div className='w-[120px] -translate-x-[60px]'>Price</div>
                <div className='w-[100px] -translate-x-[00px]'>Quantity</div>
            </div>

            <div className="flex flex-wrap gap-4 p-4">
                {items.map((item, index) => (
                    <ItemCart
                        key={index}
                        itemcartid={item.itemcartid}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        Delete={item.Delete}
                        Add={item.Add}
                    />
                ))}
            </div>
        </div>
    );
};
