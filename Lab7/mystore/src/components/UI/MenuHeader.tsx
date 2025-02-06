import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MyButton } from './MyButton';

interface MenuHeaderProps {
    label: string;
    buttons: {
        name: string;
        path: string;
        position?: 'left' | 'right' | 'center';
    }[];
    defaultPosition?: 'left' | 'right' | 'center';
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ label, buttons, defaultPosition = 'left' }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Group buttons by position
    const groupedButtons = {
        left: buttons.filter(b => !b.position || b.position === 'left'),
        center: buttons.filter(b => b.position === 'center'),
        right: buttons.filter(b => b.position === 'right')
    };

    return (
        <div className="flex bg-[#F56F18] items-center justify-between w-full p-2">
            <h2 className="text-2xl font-bold text-gray-800">{label}</h2>
            
            <div className="flex justify-between flex-1 px-4">
                {/* Left buttons */}
                <div className="flex gap-4">
                    {groupedButtons.left.map((button, index) => (
                        <MyButton
                            key={`left-${index}`}
                            name={button.name}
                            onClick={() => navigate(button.path)}
                            width="120px"
                            className={location.pathname === button.path ? "bg-[#D35400]" : ""}
                        />
                    ))}
                </div>

                {/* Center buttons */}
                <div className="flex gap-4">
                    {groupedButtons.center.map((button, index) => (
                        <MyButton
                            key={`center-${index}`}
                            name={button.name}
                            onClick={() => navigate(button.path)}
                            width="120px"
                            className={location.pathname === button.path ? "bg-[#D35400]" : ""}
                        />
                    ))}
                </div>

                {/* Right buttons */}
                <div className="flex gap-4">
                    {groupedButtons.right.map((button, index) => (
                        <MyButton
                            key={`right-${index}`}
                            name={button.name}
                            onClick={() => navigate(button.path)}
                            width="120px"
                            className={location.pathname === button.path ? "bg-[#D35400]" : ""}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
