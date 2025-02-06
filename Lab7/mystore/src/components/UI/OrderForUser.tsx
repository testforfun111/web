import React from 'react';

interface ItemOrderProps {
    orderid: number;
    date: string;
    status: string;
    width?: string;
    height?: string;
    onClick?: () => void;
}

export const OrderForUser: React.FC<ItemOrderProps> = ({
    orderid,
    date,
    status,
    width = "500px", 
    height = "40px",
    onClick
}) => {
    return (
        <div className="flex flex-col">
            <div 
                className="flex flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50"
                style={{
                    width: width,
                    height: height
                }}
                onClick={onClick}
            >
                <div className="flex flex-row items-center gap-8">
                    <div className="w-[100px]">
                        <span className="text-base font-medium">{orderid}</span>
                    </div>
                    <div className="flex-1 text-center w-[200px]">
                        <span className="text-base font-medium">{date}</span>
                    </div>
                    <div className="flex-1 flex justify-center items-center">
                        <span className="text-base font-medium">{status}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
