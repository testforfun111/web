import React, { useState, useEffect } from 'react';
import { MenuHeader } from '../UI/MenuHeader';
import { ListOrder } from '../UI/ListOrder';
import { CartTitle } from '../UI/CartTittle';
import { Search } from '../UI/Search';
import { ListItemOrder } from '../UI/ListItemOrder';
import { OrderServices } from '../../services/OrderServices';
import { ItemOrderServices } from '../../services/ItemOrderServices';
import { ProductServices } from '../../services/ProductServices';
import { ItemOrder } from '../../interfaces/models/ItemOrder';
import { Order } from '../../interfaces/models/Order';

export const AdminOrder: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderDetails, setOrderDetails] = useState<any[]>([]);

    const headerButtons = [
        { name: "Products", path: '/admin/products', position: 'center' as const },
        { name: "Users", path: '/admin/users', position: 'center' as const },
        { name: "Orders", path: '/admin/orders', position: 'center' as const },
        { name: "Logout", path: '/login', position: 'right' as const }
    ];

    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = async () => {
        try {
            if (searchValue === '') {
                const response = await OrderServices.getAll();
                console.log(response);
                setOrders(response.data);
                return;
            }
            const response = await OrderServices.getAll(searchValue);
            setOrders(response.data);
            console.log(response);
        } catch (error) {
            console.error('Error searching orders:', error);
        }
    };
    
    const getStatusString = (status: number) => {
        switch (status) {
            case 1:
                return 'Init';
            case 2:
                return 'Delivering';
            case 3:
                return 'Delivered';
            default:
                return 'None';
        }
    };

    const getStatusNumber = (status: string) => {
        switch (status) {
            case 'Init':
                return 1;
            case 'Delivering':
                return 2;
            case 'Delivered':
                return 3;
            default:
                return 1;
        }
    };

    const handleUpdateOrder = async (orderId: number, newStatus: string) => {
        try {
            const order = orders.find(o => o.id === orderId);
            console.log(order);
            if (order) {
                const newStatusNumber = getStatusNumber(newStatus);
                const currentDate = new Date(order.data_created);
                currentDate.setDate(currentDate.getDate() + 1);
                const updatedOrder = {
                    data_created: currentDate.toISOString(),
                    status: newStatusNumber,
                    id_user: order.id_user
                };
                console.log(updatedOrder);
                await OrderServices.update(orderId.toString(), updatedOrder);
                handleSearch();
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleDeleteOrder = async (orderId: number) => {
        try {
            await OrderServices.delete(orderId.toString());
            handleSearch();
            setSelectedOrder(null);
            setOrderDetails([]);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const loadOrderDetails = async (orderId: number) => {
        try {
            const itemOrdersResponse = await ItemOrderServices.getAll(orderId.toString());
            const itemOrders = itemOrdersResponse.data;
            
            const detailedItems = await Promise.all(
                itemOrders.map(async (item: ItemOrder) => {
                    const productResponse = await ProductServices.getById(item.id_product.toString());
                    const product = productResponse.data;
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

    const handleSelectOrder = async (order: Order) => {
        setSelectedOrder(order);
        await loadOrderDetails(order.id);
    };

    return (
        <div className="h-screen w-full flex flex-col items-center gap-4 p-4 bg-[#F6ECE7] overflow-hidden">
            <MenuHeader label="Admin Orders" buttons={headerButtons} />
            
            <div className="w-full max-w-7xl flex justify-center mb-2">
                <Search 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onClick={handleSearch}
                    placeholder="Search by User ID..."
                />
            </div>

            <div className="w-full max-w-8xl flex flex-row gap-4 h-[calc(100vh-200px)]">
                <div className="w-3/5">
                    <CartTitle 
                        title="Order List" 
                        width="100%"
                        fontSize="1.5rem"
                    />
                    
                    <div className="w-full overflow-auto bg-white rounded-lg shadow-lg p-6">
                        <ListOrder 
                            items={orders.map(order => ({
                                orderid: order.id,
                                date: order.data_created,
                                status: getStatusString(Number(order.status)),
                                userid: order.id_user,
                                onUpdate: (newStatus: string) => {
                                    handleUpdateOrder(order.id, newStatus);
                                },
                                onDelete: () => handleDeleteOrder(order.id),
                                onClick: () => handleSelectOrder(order),
                                width: "95%",
                                height: "80px",
                            }))}
                            maxHeight="calc(100vh - 300px)"
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
    );
};
