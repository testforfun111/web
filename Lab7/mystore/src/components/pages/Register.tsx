import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserServices } from '../../services/UserServices';
import { InfoStore } from '../UI/InfoStore';
import { InputField } from '../UI/InputField';
import { MyButton } from '../UI/MyButton';

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleRegister = () => {
        if (!login || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError(true);
            setErrorMessage("Passwords do not match");
            return;
        }
        
        UserServices.register({
            login,
            password,
            role: "User"
        }).then(() => {
            navigate('/login');
        }).catch((err) => {
            setError(true);
            switch (err.response?.status) {
                case 409:
                    setErrorMessage("User already exists.");
                    break;
                default:
                    setErrorMessage("Server error.");
            }
        });
    };

    return (
        <div className="flex gap-20 bg-[#F6ECE7]">
            <div className="flex flex-col items-center gap-6">
                <InfoStore 
                    imageUrl="/logo3.png"
                    label="Welcome to MyStore!"
                />
                <MyButton
                    name="Sign In"
                    onClick={() => navigate('/login')}
                    height="40px"
                    width="300px"
                />
            </div>
            <div className="bg-[#F56F18] w-[400px] h-[500px] p-8 rounded-lg shadow-md flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
                
                <InputField
                    label="Login"
                    value={login}
                    onChange={handleLoginChange}
                />

                <InputField
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                />

                <InputField
                    label="Confirm Password" 
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    type="password"
                />

                {error && (
                    <span className="text-red-500 text-sm">
                        {errorMessage}
                    </span>
                )}

                <MyButton
                    name="Register"
                    onClick={handleRegister}
                />
            </div>
        </div>
    );
};
