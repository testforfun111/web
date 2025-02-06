import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuHeader } from '../UI/MenuHeader';
import { ListOrderForUser } from '../UI/ListOrderForUser';
import { CartTitle } from '../UI/CartTittle';
import { ListItemOrder } from '../UI/ListItemOrder';
import { OrderServices } from '../../services/OrderServices';
import { ItemOrderServices } from '../../services/ItemOrderServices';
import { ProductServices } from '../../services/ProductServices';
import { getUser } from '../../utils/UserUtils';
import { Order } from '../../interfaces/models/Order';
import { ItemOrder } from '../../interfaces/models/ItemOrder';

export const UserHistory: React.FC = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [orderDetails, setOrderDetails] = useState<any[]>([]);

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


    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const currentUser = getUser();
            if (!currentUser) {
                console.error('No user found');
                return;
            }

            const ordersResponse = await OrderServices.getAll(currentUser.id.toString());
            const userOrders = ordersResponse.data;

            const getStatusString = (status: number) => {
                switch (status) {
                    case 1:
                        return 'Init';
                    case 2:
                        return 'Delivering';
                    case 3:
                        return 'Delivered';
                    default:
                        return 'Init';
                }
            };

            const formattedOrders = userOrders.map((order: Order) => ({
                orderid: order.id,
                date: order.data_created,
                status: getStatusString(Number(order.status)),
                width: "100%",
                height: "80px"
            }));

            setOrders(formattedOrders);
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    };

    const loadOrderDetails = async (orderId: number) => {
        try {
            console.log(orderId);
            const itemOrdersResponse = await ItemOrderServices.getAll(orderId.toString());
            const itemOrders = itemOrdersResponse.data;
            console.log(itemOrders);
            const detailedItems = await Promise.all(
                itemOrders.map(async (item: ItemOrder) => {
                    const productResponse = await ProductServices.getById(item.id_product.toString());
                    const product = productResponse.data;
                    console.log(product);
                    return {
                        id: product.id,
                        name: product.name,
                        quantity: item.quantity,
                        price: product.price * item.quantity,
                    };
                })
            );

            setOrderDetails(detailedItems);
        } catch (error) {
            console.error('Error loading order details:', error);
        }
    };

    const handleSelectOrder = async (order: any) => {
        setSelectedOrder(order);
        await loadOrderDetails(order.orderid);
    };

    return (
        <div className="h-screen w-full flex flex-col items-center gap-4 p-4 bg-[#F6ECE7] overflow-hidden">
            <MenuHeader label={currentUser.name || ''} buttons={headerButtons} />
            
            <div className="mt-8">
                <div className="w-full max-w-8xl flex flex-row gap-4 h-[calc(100vh-200px)]">
                    <div className="w-3/5">
                        <CartTitle 
                            title="My Orders" 
                            width="100%"
                            fontSize="1.5rem"
                        />
                        
                        <div className="w-full overflow-auto bg-white rounded-lg shadow-lg p-6">
                            <ListOrderForUser 
                                items={orders.map(item => ({
                                    ...item,
                                    onClick: () => handleSelectOrder(item)
                                }))}
                                maxHeight="calc(100vh - 200px)"
                                maxWidth="100%"
                                position="left"
                                className="grid grid-cols-1 gap-3"
                            />
                        </div>
                    </div>

                    <div className="w-2/5">
                        <CartTitle 
                            title="Order Details" 
                            width="100%"
                            fontSize="1.5rem"
                        />
                        
                        <div className="w-full overflow-auto bg-white rounded-lg shadow-lg p-6">
                            <ListItemOrder
                                items={orderDetails}
                                maxHeight="calc(100vh - 400px)" 
                                maxWidth="100%"
                                position="right"
                                className="grid grid-cols-1 gap-3"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
