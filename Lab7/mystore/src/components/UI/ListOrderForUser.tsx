import React from 'react';
import { OrderForUser } from './OrderForUser';

interface ListOrderForUserProps {
    items: {
        orderid: number;
        date: string;
        status: string;
        width?: string;
        height?: string;
        onClick?: () => void;
    }[];
    maxHeight?: string;
    maxWidth?: string;
    position?: string;
    className?: string;
}

export const ListOrderForUser: React.FC<ListOrderForUserProps> = ({ 
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
            className={`flex flex-wrap gap-4 p-4 overflow-y-auto ${positionClasses[position as keyof typeof positionClasses]} ${className}`}
            style={{ maxHeight, maxWidth }}
        >
            <div className="flex flex-row items-center justify-between px-4 py-4 bg-gray-100 rounded-t-lg mb-4 -ml-[10px]">
                <div className="flex flex-row items-center gap-8">
                    <div className="w-[100px]">
                        <span className="text-lg font-bold">Order ID</span>
                    </div>
                    <div className="w-[200px] gap-x-1 ml-[70px] -translate-x-[10px]">
                        <span className="text-lg font-bold">Date</span>
                    </div>
                    <div className="w-[120px] -translate-x-[90px]">
                        <span className="text-lg font-bold">Status</span>
                    </div>
                </div>
            </div>
            {items.map((item, index) => (
                <OrderForUser
                    key={index}
                    orderid={item.orderid}
                    date={item.date}
                    status={item.status}
                    width={item.width}
                    height={item.height}
                    onClick={item.onClick}
                />
            ))}
        </div>
    );
};
