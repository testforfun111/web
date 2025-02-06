import React, { useState } from 'react';
import { MyButton } from './MyButton';

interface OrderProps {
    orderid: number;
    date: string;
    status: string;
    userid: number;
    onUpdate?: (newStatus: string) => void;
    onDelete?: () => void;
    width?: string;
    height?: string;
    onClick?: () => void;
}

export const Order: React.FC<OrderProps> = ({
    orderid,
    date,
    status,
    userid,
    onUpdate,
    onDelete,
    width = "800px",
    height = "50px",
    onClick
}) => {
    const [currentStatus, setCurrentStatus] = useState(status);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setCurrentStatus(newStatus);
    };

    const handleUpdate = () => {
        if (onUpdate) {
            onUpdate(currentStatus);
        }
    };

    return (
        <div 
            className="flex flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 cursor-pointer transition-colors duration-200"
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
                    <select
                        value={currentStatus}
                        onChange={handleStatusChange}
                        className="bg-[#D9D9D9] px-4 py-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        style={{width: "120px", height: "30px"}}
                        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
                    >
                        <option value="Init">Init</option>
                        <option value="Delivering">Delivering</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
                <div className="flex-1 text-center">
                    <span className="text-base font-medium">{userid}</span>
                </div>
            </div>

            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <MyButton name="Update" onClick={handleUpdate} width="80px" className="flex items-center justify-center" />
                <MyButton name="Delete" onClick={() => onDelete?.()} width="80px" className="flex items-center justify-center" />
            </div>
        </div>
    );
};
