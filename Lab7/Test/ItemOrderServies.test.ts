// import { ItemOrder } from '../src/interfaces/models/ItemOrder';
// import { ItemOrderServices } from '../src/services/ItemOrderServices';
// import '@testing-library/jest-dom';
// import { jest, describe, it, expect } from '@jest/globals';

// const MOCK_ITEM_ORDERS: ItemOrder[] = [
//     {id: 1, id_order: 1, id_product: 1, quantity: 2},
//     {id: 2, id_order: 1, id_product: 2, quantity: 1},
//     {id: 3, id_order: 2, id_product: 3, quantity: 3},
//     {id: 4, id_order: 2, id_product: 4, quantity: 1},
//     {id: 5, id_order: 3, id_product: 5, quantity: 2},
// ];

// describe('ItemOrderServices', () => {
//     describe('getAll', () => {
//         it('should return all item orders', async () => {
//             const getAllSpy = jest.spyOn(ItemOrderServices, 'getAll')
//                 .mockResolvedValue({ data: MOCK_ITEM_ORDERS } as any);

//             const result = await ItemOrderServices.getAll();

//             expect(getAllSpy).toHaveBeenCalled();
//             expect(result.data).toEqual(MOCK_ITEM_ORDERS);
//         });

//         it('should return filtered item orders by order id', async () => {
//             const orderId = '1';
//             const filteredItems = MOCK_ITEM_ORDERS.filter(item => item.id_order === 1);

//             const getAllSpy = jest.spyOn(ItemOrderServices, 'getAll')
//                 .mockResolvedValue({ data: filteredItems } as any);

//             const result = await ItemOrderServices.getAll(orderId);

//             expect(getAllSpy).toHaveBeenCalledWith(orderId);
//             expect(result.data.length).toBe(2);
//         });
//     });

//     describe('getById', () => {
//         it('should return item order by id', async () => {
//             const mockItemOrder = MOCK_ITEM_ORDERS[0];
//             const getByIdSpy = jest.spyOn(ItemOrderServices, 'getById')
//                 .mockResolvedValue({ data: mockItemOrder } as any);

//             const result = await ItemOrderServices.getById('1');

//             expect(getByIdSpy).toHaveBeenCalledWith('1');
//             expect(result.data).toEqual(mockItemOrder);
//         });
//     });

//     describe('create', () => {
//         it('should create a new item order', async () => {
//             const newItemOrder = {
//                 id_order: 4,
//                 id_product: 6,
//                 quantity: 2
//             };

//             const createSpy = jest.spyOn(ItemOrderServices, 'create')
//                 .mockResolvedValue({ data: { ...newItemOrder, id: 6 } } as any);

//             const result = await ItemOrderServices.create(newItemOrder);

//             expect(createSpy).toHaveBeenCalledWith(newItemOrder);
//             expect(result.data).toHaveProperty('id');
//             expect(result.data.quantity).toBe(newItemOrder.quantity);
//         });
//     });

//     describe('update', () => {
//         const mockItemOrder = MOCK_ITEM_ORDERS[0];
//         const updatedData = {
//             id: 1,
//             id_order: 1,
//             id_product: 1,
//             quantity: 5
//         };

//         it('should update item order data', async () => {
//             const updateSpy = jest.spyOn(ItemOrderServices, 'update')
//                 .mockResolvedValue({ data: { ...mockItemOrder, ...updatedData } } as any);

//             const result = await ItemOrderServices.update('1', updatedData);

//             expect(updateSpy).toHaveBeenCalledWith('1', updatedData);
//             expect(result.data.quantity).toBe(updatedData.quantity);
//         });
//     });

//     describe('delete', () => {
//         it('should delete item order by id', async () => {
//             const deleteSpy = jest.spyOn(ItemOrderServices, 'delete')
//                 .mockResolvedValue({} as any);

//             await ItemOrderServices.delete('1');

//             expect(deleteSpy).toHaveBeenCalledWith('1');
//         });
//     });
// });
