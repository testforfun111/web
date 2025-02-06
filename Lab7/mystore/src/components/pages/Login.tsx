import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserServices } from '../../services/UserServices';
import { InfoStore } from '../UI/InfoStore';
import { InputField } from '../UI/InputField';
import { MyButton } from '../UI/MyButton';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSignIn = () => {
        if (!login || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        UserServices.signIn({login, password}).then((res) => {
            if (res.data.role === "Admin") {
                navigate('/admin/products');
            } else {
                navigate(`/user/${res.data.id}/info`);
            }
        }).catch((err) => {
            console.log(err);
            setError(true);
            switch (err.response?.status) {
                case 401:
                    setErrorMessage("Invalid password.");
                    break;
                case 404:
                    setErrorMessage("User not found.");
                    break;
                default:
                    setErrorMessage("Server error.");
            }
        });
    };
    
    return (
        <div className="flex gap-20  bg-[#F6ECE7]">
            <div className="flex  flex-col items-center gap-6">
                <InfoStore 
                    imageUrl="/logo3.png"
                    label="Welcome to MyStore!"
                />
                <MyButton
                    name="Register"
                    onClick={() => navigate('/register')}
                    height="40px"
                    width="300px"
                />
            </div>
            <div className="bg-[#F56F18] w-[400px] h-[500px] p-8 rounded-lg shadow-md flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                
                <InputField
                    label="Login"
                    value={login}
                    onChange={handleLoginChange}
                />

                <InputField
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    type={showPassword ? "text" : "password"}
                />

                <div className="flex items-center gap-2 justify-end">
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}
                        className="w-4 h-4"
                    />
                    <label htmlFor="showPassword" className="text-sm text-gray-600">
                        Show password
                    </label>
                </div>

                {error && (
                    <span className="text-red-500 text-sm">
                        {errorMessage}
                    </span>
                )}

                <MyButton
                    name="Sign In"
                    onClick={handleSignIn}
                />
            </div>
        </div>
    );
        
}
