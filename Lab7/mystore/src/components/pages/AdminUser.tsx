import React, { useState, useRef, useEffect } from 'react';
import { MyButton } from '../UI/MyButton';
import { MenuHeader } from '../UI/MenuHeader';
import { ListItem } from '../UI/ListItem';
import { CartTitle } from '../UI/CartTittle';
import { InputField } from '../UI/InputField';
import { Search } from '../UI/Search';
import { UserServices } from '../../services/UserServices';
import { User } from '../../interfaces/models/User';

export const AdminUser: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [searchValue, setSearchValue] = useState('');
    const [userId, setUserId] = useState<number>(0);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [role, setRole] = useState('');
    const [items, setItems] = useState<Array<{
        id: number;
        src: string;
        name: string;
        onClick: () => void;
    }>>([]);

    const headerButtons = [
        { name: "Products", path: '/admin/products', position: 'center' as const },
        { name: "Users", path: '/admin/users', position: 'center' as const },
        { name: "Orders", path: '/admin/orders', position: 'center' as const },
        { name: "Logout", path: '/login', position: 'right' as const }
    ];

    useEffect(() => {
        handleSearch();
    }, []);

    const handleUserClick = async (userId: number) => {
        try {
            const response = await UserServices.getById(userId.toString());
            const user = response.data;
            
            setUserId(user.id);
            setName(user.name || '');
            setPhone(user.phone || '');
            setAddress(user.address || '');
            setEmail(user.email || '');
            setLogin(user.login);
            setPassword(user.password);
            setRole(user.role);
            setAvatar(user.avatar || '');
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const users = await UserServices.getAll(searchValue);
            console.log(users);
            const mappedItems = users.data.map((user: User) => ({
                id: user.id,
                src: user.avatar || './profile.jpg',
                name: user.name || user.login,
                onClick: () => handleUserClick(user.id)
            }));
            setItems(mappedItems);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(file.name);
        }
    };

    const handleAddUser = async () => {
        if (!login || !password) {
            alert('Login and password are required');
            return;
        }

        try {
            const userData = {
                avatar,
                name,
                email,
                address,
                phone,
                login,
                password,
                role: 'User'
            };
            
            await UserServices.register(userData);
            setUserId(0);
            setName('');
            setPhone('');
            setAddress('');
            setEmail('');
            setLogin('');
            setPassword('');
            setAvatar('');
            setRole('');
            handleSearch();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleSaveUser = async () => {
        if (!login || !password) {
            alert('Login and password are required');
            return;
        }

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
            setUserId(0);
            setName('');
            setPhone('');
            setAddress('');
            setEmail('');
            setLogin('');
            setPassword('');
            setAvatar('');
            setRole('');
            handleSearch();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            await UserServices.delete(userId);
            handleSearch();
            setUserId(0);
            setName('');
            setPhone('');
            setAddress('');
            setEmail('');
            setLogin('');
            setPassword('');
            setAvatar('');
            setRole('');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col items-center gap-4 p-4 bg-[#F6ECE7] overflow-hidden">
            <MenuHeader label="Admin Users" buttons={headerButtons} />
            
            <div className="w-full max-w-7xl flex justify-center mb-2">
                <Search 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onClick={handleSearch}
                />
            </div>

            <div className="w-full max-w-8xl flex flex-col lg:flex-row gap-4 h-[calc(100vh-200px)]">
                <div className="w-full lg:w-1/2 overflow-auto">
                    <ListItem 
                        items={items}
                        maxHeight="100%"
                        maxWidth="100%"
                        position="left"
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3"
                    />
                </div>

                <div className="w-full lg:w-1/2 flex flex-col gap-3 overflow-auto">
                    <CartTitle 
                        title="User Management" 
                        width="100%"
                        fontSize="1.5rem"
                    />
                    
                    <div className="flex flex-col gap-3 bg-[#F56F18] p-4 rounded-lg shadow-md items-center">
                        <div className="flex flex-col items-center gap-3">
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

                        <div className="w-[400px] flex flex-col gap-3">
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
                                value="user"
                                onChange={() => setRole("user")}
                                labelWidth="120px"
                                inputWidth="280px"
                                disabled={true}
                            />

                            <div className="flex flex-row gap-2 items-center mt-4">
                                <MyButton
                                    name="Add User"
                                    onClick={handleAddUser}
                                    width="130px"
                                />

                                <MyButton
                                    name="Save User"
                                    onClick={handleSaveUser}
                                    width="130px"
                                />
                                
                                <MyButton
                                    name="Remove"
                                    onClick={() => handleDeleteUser(userId.toString())}
                                    width="130px"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
