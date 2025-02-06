import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyButton } from '../UI/MyButton';
import { MenuHeader } from '../UI/MenuHeader';
import { ListItem } from '../UI/ListItem';
import { CartTitle } from '../UI/CartTittle';
import { InputField } from '../UI/InputField';
import { Search } from '../UI/Search';
import { ItemCartServices } from '../../services/ItemCartServices';
import { ProductServices } from '../../services/ProductServices';
import { Product } from '../../interfaces/models/Product';
import { getUser } from '../../utils/UserUtils';
import { CartServices } from '../../services/CartServices';
import { Cart } from '../../interfaces/models/Cart';
import { ItemCart } from '../../interfaces/models/ItemCart';
export const UserProduct: React.FC = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [productId, setProductId] = useState<number>(0);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState<number>(0);
    const [cartItemCount, setCartItemCount] = useState<number>(0);
    
    const currentUser = getUser();
    if (!currentUser) {
        console.error('No user found');
        return;
    }
    const headerButtons = [
        { name: "Info", path: `/user/${currentUser.id}/info`, position: 'center' as const },
        { name: "Products", path: `/user/${currentUser.id}/products`, position: 'center' as const },
        { name: "Cart", path: `/user/${currentUser.id}/cart`, position: 'center' as const },
        { name: "History", path: `/user/${currentUser.id}/orders`, position: 'center' as const },
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
            if (currentUser) {
                const cartResponse = await CartServices.getAll();
                const userCart = cartResponse.data.find((cart: Cart) => cart.id_user === currentUser.id);
                if (userCart) {
                    const itemCartsResponse = await ItemCartServices.getAll(userCart.id.toString());
                    const cartItem = itemCartsResponse.data.find((item: ItemCart) => item.id_product === product.id);
                    setCartItemCount(cartItem ? cartItem.quantity : 0);
                } else {
                    setCartItemCount(0);
                }
            } else {
                setCartItemCount(0);
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await ProductServices.getAll();
                const mappedItems = products.data.map((product: Product) => ({
                    id: product.id,
                    src: product.img || '/logo2.jpg',
                    name: product.name,
                    onClick: () => handleProductClick(product.id)
                }));
                setItems(mappedItems);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);


    const handleSearch = async () => {
        try {
            const products = await ProductServices.getAll(searchValue);
            const mappedItems = products.data.map((product: Product) => ({
                id: product.id,
                src: product.img || '/logo2.jpg',
                name: product.name,
                onClick: () => handleProductClick(product.id)
            }));
            setItems(mappedItems);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const handleAddToCart = async (productId: string) => {
        try {
            // Get user's current cart
            const currentUser = getUser();
            if (!currentUser) {
                console.error('No user found');
                return;
            }
            const cartResponse = await CartServices.getAll();
            let userCart = cartResponse.data.find((cart: Cart) => cart.id_user === currentUser.id);
            if (!cartResponse.data || !userCart) {
                // Create new cart for user
                const newCart = await CartServices.addCart(currentUser.id);
                userCart = newCart.data;
                console.log(userCart);
            }
            if (productId === "0") {
                throw new Error("Invalid product ID");
            }

            // Add product to cart with cart_id
            const cartItem = {
                id_cart: userCart.id,
                id_product: productId,
                quantity: 1 // Default quantity when adding to cart
            };
            await ItemCartServices.addItem(cartItem);
            setCartItemCount(cartItemCount + 1);
            console.log('Product added to cart successfully');
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleRemoveFromCart = async (productId: string) => {
        try {
            const currentUser = getUser();
            if (!currentUser) {
                console.error('No user found');
                return;
            }

            // Get user's cart
            const cartResponse = await CartServices.getAll();
            console.log(cartResponse);
            const userCart = cartResponse.data.find((cart: Cart) => cart.id_user === currentUser.id);
            console.log(userCart);
            if (!userCart) {
                console.error('No cart found for user');
                return;
            }

            // Get all items in cart
            const cartItems = await ItemCartServices.getAll(userCart.id.toString());
            console.log(cartItems);
            // Find the specific item with matching cart_id and product_id
            const itemToRemove = cartItems.data.find((item: any) => 
                item.id_product === Number(productId)
            );
            console.log(itemToRemove);

            if (!itemToRemove) {
                console.error('Item not found in cart');
                return;
            }

            // Remove the found item using its ID
            await ItemCartServices.removeItem(itemToRemove.id.toString());
            setCartItemCount(cartItemCount - 1);
            console.log('Product removed from cart successfully');
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col items-center gap-4 p-4 bg-[#F6ECE7] overflow-hidden">
            <MenuHeader label={currentUser.name || ''} buttons={headerButtons} />
            
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
                        title="Product Information" 
                        width="100%"
                        fontSize="1.5rem"
                    />
                    
                    <div className="flex flex-col gap-3 bg-[#F56F18] p-4 rounded-lg shadow-md items-center">
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

                            <div className="flex flex-row gap-2 items-center mt-4">
                                <MyButton
                                    name="Del"
                                    onClick={() => handleRemoveFromCart(productId.toString())}
                                    width="200px"
                                />

                                <div className="text-white w-[200px]  flex justify-center text-lg font-bold my-2">
                                    In Cart: {cartItemCount}
                                </div>

                                <MyButton
                                    name="Add"
                                    onClick={() => handleAddToCart(productId.toString())} 
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
