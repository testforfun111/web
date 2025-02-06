import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyButton } from '../UI/MyButton';
import { MenuHeader } from '../UI/MenuHeader';
import { CartTitle } from '../UI/CartTittle';
import { InputField } from '../UI/InputField';
import { UserServices } from '../../services/UserServices';
import { getUser, setUser } from '../../utils/UserUtils';

export const UserInfo: React.FC = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [userId, setUserId] = useState<number>(0);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [role, setRole] = useState('');

    const headerButtons = [
        { name: "Info", path: `/user/${userId}/info`, position: 'center' as const },
        { name: "Products", path: `/user/${userId}/products`, position: 'center' as const },
        { name: "Cart", path: `/user/${userId}/cart`, position: 'center' as const },
        { name: "History", path: `/user/${userId}/orders`, position: 'center' as const },
        { name: "Logout", path: '/login', position: 'right' as const }
    ];

    useEffect(() => {
        const curUser = getUser();
        if (curUser) {
            setUserId(curUser.id);
            setName(curUser.name ?? '');
            setPhone(curUser.phone ?? '');
            setAddress(curUser.address ?? '');
            setEmail(curUser.email ?? ''); 
            setLogin(curUser.login ?? '');
            setPassword(curUser.password ?? '');
            setRole(curUser.role);
            setAvatar(curUser.avatar ?? '');
        }
    }, []);
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveUser = async () => {
        try {
            const userData = {
                avatar,
                name,
                email,
                address,
                phone,
                login,
                password,
                role: role
            };
            
            await UserServices.update(userId.toString(), userData);
            const updatedUser = {
                id: userId,
                ...userData
            };
            setUser(updatedUser);
            setAvatarPreview(null);
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col items-center gap-4 p-4 bg-[#F6ECE7] overflow-hidden">
            <MenuHeader label={name} buttons={headerButtons} />

            <div className="w-[1500px] h-[800px] max-w-8xl flex flex-col lg:flex-row gap-4 justify-center">
                <div className="w-full lg:w-1/2 flex flex-col gap-3 overflow-auto">
                    <CartTitle 
                        title="User Management" 
                        width="100%"
                        fontSize="1.5rem"
                    />
                    
                    <div className="flex flex-col gap-3 bg-[#F56F18] p-4 rounded-lg shadow-md">
                        <div className="grid grid-cols-2 gap-6">
                            {/* Left Column - Avatar Section */}
                            <div className="flex flex-col items-center gap-4">
                                {avatarPreview && (
                                    <img 
                                        src={avatarPreview} 
                                        alt="Avatar preview" 
                                        className="w-[120px] h-[120px] rounded-full object-cover border-4 border-white shadow-lg"
                                    />
                                )}
                                <img
                                    src={avatar ? `http://localhost:5173/${avatar}` : '/profile.jpg'} 
                                    alt="User Avatar"
                                    className="w-[120px] h-[120px] rounded-full object-cover border-4 border-white shadow-lg"
                                />
                                <input 
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <MyButton
                                    name={avatar ? "Change Avatar" : "Upload Avatar"}
                                    onClick={() => fileInputRef.current?.click()}
                                    width="200px"
                                />
                            </div>

                            {/* Right Column - User Info */}
                            <div className="flex flex-col gap-3">
                                <InputField
                                    label="User ID"
                                    value={userId.toString()}
                                    onChange={() => {}}
                                    type="number"
                                    labelWidth="120px"
                                    inputWidth="280px"
                                    disabled={true}
                                />

                                <InputField
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    labelWidth="120px"
                                    inputWidth="280px"
                                />
                                
                                <InputField
                                    label="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    labelWidth="120px"
                                    inputWidth="280px"
                                />
                                
                                <InputField
                                    label="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    labelWidth="120px"
                                    inputWidth="280px"
                                />

                                <InputField
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    labelWidth="120px"
                                    inputWidth="280px"
                                />

                                <InputField
                                    label="Login"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    labelWidth="120px"
                                    inputWidth="280px"
                                />

                                <InputField
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    labelWidth="120px"
                                    inputWidth="280px"
                                />

                                <InputField
                                    label="Role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    labelWidth="120px"
                                    inputWidth="280px"
                                    disabled={true}
                                />
                            </div>
                        </div>

                        {/* Save Button - Centered */}
                        <div className="flex justify-center mt-4">
                            <MyButton
                                name="Save User"
                                onClick={handleSaveUser}
                                width="200px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
