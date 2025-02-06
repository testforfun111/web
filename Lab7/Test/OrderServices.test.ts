// import { Order } from '../src/interfaces/models/Order';
// import { OrderServices } from '../src/services/OrderServices';
// import '@testing-library/jest-dom';
// import { jest, describe, it, expect } from '@jest/globals';

// const MOCK_ORDERS: Order[] = [
//     {id: 1, id_user: 1, status: 0, data_created: "2024-03-20T10:00:00.000Z"},
//     {id: 2, id_user: 2, status: 1, data_created: "2024-03-20T11:00:00.000Z"}, 
//     {id: 3, id_user: 3, status: 2, data_created: "2024-03-20T12:00:00.000Z"},
//     {id: 4, id_user: 4, status: 0, data_created: "2024-03-20T13:00:00.000Z"},
//     {id: 5, id_user: 5, status: 1, data_created: "2024-03-20T14:00:00.000Z"},
// ];

// describe('OrderServices', () => {
//     describe('getAll', () => {
//         it('should return all orders', async () => {
//             const getAllSpy = jest.spyOn(OrderServices, 'getAll')
//                 .mockResolvedValue({ data: MOCK_ORDERS } as any);

//             const result = await OrderServices.getAll();

//             expect(getAllSpy).toHaveBeenCalled();
//             expect(result.data).toEqual(MOCK_ORDERS);
//         });

//         it('should return filtered orders with pagination', async () => {
//             const params = {
//                 userId: '1',
//                 skip: 0,
//                 take: 2
//             };

//             const getAllSpy = jest.spyOn(OrderServices, 'getAll')
//                 .mockResolvedValue({ data: MOCK_ORDERS.slice(0, 2) } as any);

//             const result = await OrderServices.getAll(params.userId);

//             expect(getAllSpy).toHaveBeenCalledWith(params.userId);
//             expect(result.data.length).toBe(2);
//         });
//     });

//     describe('getById', () => {
//         it('should return order by id', async () => {
//             const mockOrder = MOCK_ORDERS[0];
//             const getByIdSpy = jest.spyOn(OrderServices, 'getById')
//                 .mockResolvedValue({ data: mockOrder } as any);

//             const result = await OrderServices.getById('1');

//             expect(getByIdSpy).toHaveBeenCalledWith('1');
//             expect(result.data).toEqual(mockOrder);
//         });
//     });

//     describe('create', () => {
//         it('should create a new order', async () => {
//             const newOrder = {
//                 userId: 6,
//                 products: [{productId: 1, quantity: 1}],
//                 totalPrice: 99.99,
//                 status: 'pending'
//             };

//             const createSpy = jest.spyOn(OrderServices, 'create')
//                 .mockResolvedValue({ data: { ...newOrder, id: 6, createdAt: 1710946800000 } } as any);

//             const result = await OrderServices.create(newOrder);

//             expect(createSpy).toHaveBeenCalledWith(newOrder);
//             expect(result.data).toHaveProperty('id');
//             expect(result.data.userId).toBe(newOrder.userId);
//         });
//     });

//     describe('update', () => {
//         const mockOrder = MOCK_ORDERS[0];
//         const updatedData = {
//             id: 1,
//             userId: 1,
//             products: [{productId: 1, quantity: 3}],
//             totalPrice: 299.97,
//             status: 'completed',
//             createdAt: 1710928800000
//         };

//         it('should update order data', async () => {
//             const updateSpy = jest.spyOn(OrderServices, 'update')
//                 .mockResolvedValue({ data: { ...mockOrder, ...updatedData } } as any);

//             const result = await OrderServices.update('1', updatedData);

//             expect(updateSpy).toHaveBeenCalledWith('1', updatedData);
//             expect(result.data.status).toBe(updatedData.status);
//         });
//     });

//     describe('delete', () => {
//         it('should delete order by id', async () => {
//             const deleteSpy = jest.spyOn(OrderServices, 'delete')
//                 .mockResolvedValue({} as any);

//             await OrderServices.delete('1');

//             expect(deleteSpy).toHaveBeenCalledWith('1');
//         });
//     });
// });
