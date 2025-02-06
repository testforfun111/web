import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyButton } from '../UI/MyButton';
import { MenuHeader } from '../UI/MenuHeader';
import { ListItem } from '../UI/ListItem';
import { CartTitle } from '../UI/CartTittle';
import { InputField } from '../UI/InputField';
import { Search } from '../UI/Search';
import { ProductServices } from '../../services/ProductServices';
import { Product } from '../../interfaces/models/Product';

export const AdminProduct: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [searchValue, setSearchValue] = useState('');
    const [productId, setProductId] = useState<number>(0);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState<number>(0);
    const [image, setImage] = useState('');

    const headerButtons = [
        { name: "Products", path: '/admin/products', position: 'center' as const },
        { name: "Users", path: '/admin/users', position: 'center' as const },
        { name: "Orders", path: '/admin/orders', position: 'center' as const },
        { name: "Logout", path: '/login', position: 'right' as const }
    ];

    const [items, setItems] = useState<Array<{
        id: number;
        src: string;
        name: string;
        onClick: () => void;
    }>>([]);

    const handleProductClick = async (productId: number) => {
        try {
            const response = await ProductServices.getById(productId.toString());
            const product = response.data;
            
            setProductId(product.id);
            setProductName(product.name);
            setPrice(product.price);
            setDescription(product.description || '');
            setQuantity(product.quantity);
            setImage(product.img || '');
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const products = await ProductServices.getAll(searchValue);
            const mappedItems = products.data.map((product: Product) => ({
                id: product.id,
                src: product.img || 'logo.png',
                name: product.name,
                onClick: () => handleProductClick(product.id)
            }));
            setItems(mappedItems);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file.name);
        }
    };

    const handleAddProduct = async () => {
        if (price <= 0 || quantity <= 0) {
            alert('Price and quantity cannot be negative');
            return;
        }

        if (!productName.trim()) {
            alert('Product name cannot be empty');
            return;
        }

        try {
            const productData = {
                name: productName,
                price: price,
                quantity: quantity,
                description,
                img: image
            };
            
            await ProductServices.create(productData);
            setProductId(0);
            setProductName('');
            setPrice(0);
            setDescription('');
            setQuantity(0);
            setImage('');
            handleSearch();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleSaveProduct = async () => {
        if (price <= 0 || quantity <= 0) {
            alert('Price and quantity cannot be negative');
            return;
        }

        if (!productName.trim()) {
            alert('Product name cannot be empty');
            return;
        }

        try {
            const productData = {
                id: productId,
                name: productName,
                price: price,
                quantity: quantity,
                description,
                img: image
            };
            
            await ProductServices.update(productId.toString(), productData);
            setProductId(0);
            setProductName('');
            setPrice(0);
            setDescription('');
            setQuantity(0);
            setImage('');
            handleSearch();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        try {
            await ProductServices.delete(productId);
            handleSearch();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div className="h-screen w-full flex flex-col items-center gap-4 p-4 bg-[#F6ECE7] overflow-hidden">
            <MenuHeader label="Admin Products" buttons={headerButtons} />
            
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
                        title="Product Management" 
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
                                name={image ? "Change Image" : "Upload Image"}
                                onClick={() => fileInputRef.current?.click()}
                                width="200px"
                            />
                        </div>

                        <div className="w-[400px] flex flex-col gap-3">
                            <InputField
                                label="Product ID"
                                value={productId.toString()}
                                onChange={(e) => setProductId(Number(e.target.value))}
                                type="number"
                                labelWidth="120px"
                                inputWidth="280px"
                                disabled={true}
                            />

                            <InputField
                                label="Name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                labelWidth="120px"
                                inputWidth="280px"
                            />
                            
                            <InputField
                                label="Price"
                                value={price.toString()}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                type="number"
                                labelWidth="120px"
                                inputWidth="280px"
                            />
                            
                            <InputField
                                label="Quantity"
                                value={quantity.toString()}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                type="number"
                                labelWidth="120px"
                                inputWidth="280px"
                            />

                            <InputField
                                label="Description" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                labelWidth="120px"
                                inputWidth="280px"
                            />

                            <div className="flex flex-col gap-2 items-center mt-4">
                                <MyButton
                                    name="Add Product"
                                    onClick={handleAddProduct}
                                    width="200px"
                                />

                                <MyButton
                                    name="Save Product"
                                    onClick={handleSaveProduct}
                                    width="200px"
                                />
                                
                                <MyButton
                                    name="Remove"
                                    onClick={() => handleDeleteProduct(productId.toString())}
                                    width="200px"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
