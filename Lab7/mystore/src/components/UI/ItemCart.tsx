import React from 'react';
import { MyButton } from './MyButton';

interface ItemCartProps {
    itemcartid: number;
    name: string;
    price: number;
    quantity: number;
    Delete?: () => void;
    Add?: () => void;
    width?: string;
    height?: string;
}

export const ItemCart: React.FC<ItemCartProps> = ({
    itemcartid,
    name,
    price,
    quantity,
    Delete,
    Add,
    width = "800px",
    height = "50px"
}) => {
    return (
        <div 
            className="flex flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md"
            style={{
                width: width,
                height: height
            }}
        >
            <div className="flex flex-row items-center gap-8">
                <div className="w-[100px]">
                    <span className="text-base font-medium">#{itemcartid}</span>
                </div>
                <div className="w-[200px]">
                    <span className="text-base font-medium">{name}</span>
                </div>
                <div className="w-[120px]">
                    <span className="text-base font-medium">${price}</span>
                </div>
            </div>

            <div className="flex gap-2 items-center">
                <MyButton name="-" onClick={() => Delete?.()} width="40px" className="flex items-center justify-center" />
                <div className="w-[60px] text-center">
                    <span className="text-base font-medium">{quantity}</span>
                </div>
                <MyButton name="+" onClick={() => Add?.()} width="40px" className="flex items-center justify-center" />
            </div>
        </div>
    );
};
