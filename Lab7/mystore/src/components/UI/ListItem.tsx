import React from 'react';
import { Item } from './Item';

interface ListItemProps {
    items: {
        id: number;
        src: string;
        name: string;
        onClick: () => void;
    }[];
    maxHeight?: string;
    maxWidth?: string;
    position?: string;
    className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({ 
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
            {items.map((item, index) => (
                <Item
                    key={index}
                    id={item.id}
                    src={item.src}
                    name={item.name} 
                    onClick={item.onClick}
                />
            ))}
        </div>
    );
};
