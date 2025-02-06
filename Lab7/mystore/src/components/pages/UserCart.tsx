import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyButton } from '../UI/MyButton';
import { MenuHeader } from '../UI/MenuHeader';
import { CartTitle } from '../UI/CartTittle';
import { ListItemCart } from '../UI/ListItemCart';
import { ItemCartServices } from '../../services/ItemCartServices';
import { CartServices } from '../../services/CartServices';
import { ProductServices } from '../../services/ProductServices';
import { OrderServices } from '../../services/OrderServices';
import { getUser } from '../../utils/UserUtils';
import { Cart } from '../../interfaces/models/Cart';
import { ItemCart } from '../../interfaces/models/ItemCart';
import { ItemOrderServices } from '../../services/ItemOrderServices';
import { Error } from '../UI/Error';

export const UserCart: React.FC = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [error, setError] = useState<string>('');

    const currentUser = getUser();
    if (!currentUser) {
        setError('No user found');
        return;
    }
    const headerButtons = [
        { name: "Info", path: `/user/${currentUser.id}/info`, position: 'center' as const },
        { name: "Products", path: `/user/${currentUser.id}/products`, position: 'center' as const },
        { name: "Cart", path: `/user/${currentUser.id}/cart`, position: 'center' as const },
        { name: "History", path: `/user/${currentUser.id}/orders`, position: 'center' as const },
        { name: "Logout", path: '/login', position: 'right' as const }
    ];


    useEffect(() => {
        loadCartItems();
    }, []);

    const loadCartItems = async () => {
        try {
            const currentUser = getUser();
            if (!currentUser) {
                setError('No user found');
                return;
            }

            const cartResponse = await CartServices.getAll();
            const userCart = cartResponse.data.find((cart: Cart) => cart.id_user === currentUser.id);

            if (!userCart) {
                setError('No cart found for user');
                return;
            }

            const itemCartsResponse = await ItemCartServices.getAll(userCart.id.toString());
            const itemCarts = itemCartsResponse.data;

            const itemsWithDetails = await Promise.all(
                itemCarts.map(async (item: ItemCart) => {
                    const productResponse = await ProductServices.getById(item.id_product.toString());
                    const product = productResponse.data;
                    return {
                        itemcartid: item.id,
                        id: product.id,
                        name: product.name,
                        price: product.price * item.quantity,
                        quantity: item.quantity,
                        src: product.img || '/logo2.jpg'
                    };
                })
            );

            setCartItems(itemsWithDetails);
        } catch (error) {
            setError('Error loading cart items');
        }
    };

    const handleDelete = async (itemId: number) => {
        try {
            await ItemCartServices.removeItem(itemId.toString());
            await loadCartItems();
        } catch (error) {
            setError('Error deleting item');
        }
    };

    const handleAdd = async (itemId: number) => {
        try {
            const currentUser = getUser();
            if (!currentUser) {
                setError('No user found');
                return;
            }

            const cartResponse = await CartServices.getAll();
            const userCart = cartResponse.data.find((cart: Cart) => cart.id_user === currentUser.id);
            if (!userCart) {
                setError('No cart found for user');
                return;
            }
            const item = await ItemCartServices.getByIdCart(itemId.toString());
            if (item) {
                const cartItem = {
                    id_cart: userCart.id,
                    id_product: item.data.id_product,
                    quantity: 1 // Default quantity when adding to cart
                };
                await ItemCartServices.addItem(cartItem);
                await loadCartItems();
            }
        } catch (error) {
            setError('Error updating item quantity');
        }
    };

    const handleCheckout = async () => {
        try {
            const currentUser = getUser();
            if (!currentUser) {
                setError('No user found');
                return;
            }

            if (cartItems.length === 0) {
                setError('Cart is empty');
                return;
            }

            // Check product quantities first
            for (const item of cartItems) {
                const product = await ProductServices.getById(item.id.toString());
                if (!product || product.data.quantity < item.quantity) {
                    setError(`Not enough stock for product ${item.name}. Available: ${product?.data.quantity || 0}`);
                    return;
                }
            }

            // Create order
            const order = {
                id_user: currentUser.id,
                status: 0,
                data_created: new Date().toISOString()
            };
            const orderResponse = await OrderServices.create(order);

            // Process each item
            for (const item of cartItems) {
                const itemOrder = {
                    id_order: orderResponse.data.id,
                    id_product: item.id,
                    quantity: item.quantity,
                };
                await ItemOrderServices.create(itemOrder);

                // Update product quantity
                const product = await ProductServices.getById(item.id.toString());
                const updatedProduct = {
                    ...product.data,
                    quantity: product.data.quantity - item.quantity
                };
                await ProductServices.update(item.id.toString(), updatedProduct);

                // Remove items from cart
                for (let i = 0; i < item.quantity; i++) {
                    await ItemCartServices.removeItem(item.itemcartid.toString());
                }
            }

            setCartItems([]);
            navigate(`/user/${currentUser.id}/orders`);
        } catch (error) {
            setError('Error during checkout');
        }
    };

    const total = cartItems.reduce((total, item) => total + (item.price), 0);

    return (
        <div className="h-screen w-full flex flex-col items-center gap-4 p-4 bg-[#F6ECE7] overflow-hidden">
            {error && <Error message={error} onClick={() => setError('')} />}
            <MenuHeader label={currentUser.name || ''} buttons={headerButtons} />

            <div className="w-full max-w-7xl flex flex-row gap-4">
                <div className="w-3/4">
                    <CartTitle 
                        title="Shopping Cart" 
                        width="100%"
                        fontSize="1.5rem"
                    />
                    
                    <div className="w-full bg-white rounded-lg shadow-lg p-6">
                        <ListItemCart
                            items={cartItems.map(item => ({
                                ...item,
                                Delete: () => handleDelete(item.itemcartid),
                                Add: () => handleAdd(item.itemcartid)
                            }))}
                            maxHeight="400px"
                            position="left"
                            className="grid grid-cols-1 gap-3"
                        />
                    </div>
                </div>

                <div className="w-1/4">
                    <CartTitle 
                        title="Order Summary" 
                        width="100%"
                        fontSize="1.5rem"
                    />
                    
                    <div className="w-full bg-white rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold">Total:</span>
                            <span className="text-xl font-bold">${total}</span>
                        </div>

                        <div className="mt-6">
                            <MyButton 
                                name="Checkout" 
                                onClick={handleCheckout}
                                width="100%"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
