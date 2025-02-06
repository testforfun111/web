// import { ItemCart } from '../src/interfaces/models/ItemCart';
// import { ItemCartServices } from '../src/services/ItemCartServices';
// import '@testing-library/jest-dom';
// import { jest, describe, it, expect } from '@jest/globals';

// const MOCK_ITEM_CARTS: ItemCart[] = [
//     {id: 1, id_cart: 1, id_product: 1, quantity: 2},
//     {id: 2, id_cart: 1, id_product: 2, quantity: 1}, 
//     {id: 3, id_cart: 2, id_product: 3, quantity: 3},
//     {id: 4, id_cart: 2, id_product: 4, quantity: 1},
//     {id: 5, id_cart: 3, id_product: 5, quantity: 2},
// ];

// describe('ItemCartServices', () => {
//     describe('getAll', () => {
//         it('should return all item carts', async () => {
//             const getAllSpy = jest.spyOn(ItemCartServices, 'getAll')
//                 .mockResolvedValue({ data: MOCK_ITEM_CARTS } as any);

//             const result = await ItemCartServices.getAll();

//             expect(getAllSpy).toHaveBeenCalled();
//             expect(result.data).toEqual(MOCK_ITEM_CARTS);
//         });

//         it('should return filtered item carts with pagination', async () => {
//             const params = {
//                 cartId: '1',
//                 skip: 0,
//                 take: 2
//             };

//             const getAllSpy = jest.spyOn(ItemCartServices, 'getAll')
//                 .mockResolvedValue({ data: MOCK_ITEM_CARTS.slice(0, 2) } as any);

//             const result = await ItemCartServices.getAll();

//             expect(getAllSpy).toHaveBeenCalledWith();
//             expect(result.data.length).toBe(2);
//         });
//     });

//     describe('getById', () => {
//         it('should return item cart by id', async () => {
//             const mockItemCart = MOCK_ITEM_CARTS[0];
//             const getByIdSpy = jest.spyOn(ItemCartServices, 'getByIdCart')
//                 .mockResolvedValue({ data: mockItemCart } as any);

//             const result = await ItemCartServices.getByIdCart('1');

//             expect(getByIdSpy).toHaveBeenCalledWith('1');
//             expect(result.data).toEqual(mockItemCart);
//         });
//     });

//     describe('create', () => {
//         it('should create a new item cart', async () => {
//             const newItemCart = {
//                 id_cart: 4,
//                 id_product: 6,
//                 quantity: 2
//             };

//             const createSpy = jest.spyOn(ItemCartServices, 'addItem')
//                 .mockResolvedValue({ data: { ...newItemCart, id: 6 } } as any);

//             const result = await ItemCartServices.addItem(newItemCart);

//             expect(createSpy).toHaveBeenCalledWith(newItemCart);
//             expect(result.data).toHaveProperty('id');
//             expect(result.data.quantity).toBe(newItemCart.quantity);
//         });
//     });

//     describe('update', () => {
//         const mockItemCart = MOCK_ITEM_CARTS[0];
//         const updatedData = {
//             id: 1,
//             id_cart: 1,
//             id_product: 1,
//             quantity: 5
//         };

//         it('should update item cart data', async () => {
//             const updateSpy = jest.spyOn(ItemCartServices, 'updateItem')
//                 .mockResolvedValue({ data: { ...mockItemCart, ...updatedData } } as any);

//             const result = await ItemCartServices.updateItem('1', updatedData);

//             expect(updateSpy).toHaveBeenCalledWith('1', updatedData);
//             expect(result.data.quantity).toBe(updatedData.quantity);
//         });
//     });

//     describe('delete', () => {
//         it('should delete item cart by id', async () => {
//             const deleteSpy = jest.spyOn(ItemCartServices, 'removeItem')
//                 .mockResolvedValue({} as any);

//             await ItemCartServices.removeItem('1');

//             expect(deleteSpy).toHaveBeenCalledWith('1');
//         });
//     });
// });
