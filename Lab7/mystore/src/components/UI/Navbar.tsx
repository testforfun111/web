import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MyButton } from './MyButton';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-[#F56F18] p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src="./logo3.png" alt="MyStore Logo" className="h-10 w-auto" />
                    <span className="text-white text-xl font-bold ml-2">MyStore</span>
                </div>
                
                <div className="flex gap-4">
                    <MyButton
                        name="Login"
                        onClick={() => navigate('/login')}
                    />
                    <MyButton
                        name="Register" 
                        onClick={() => navigate('/signup')}
                    />
                </div>
            </div>
        </nav>
    );
};
