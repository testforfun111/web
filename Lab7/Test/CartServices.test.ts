// import { Cart } from '../src/interfaces/models/Cart';
// import { CartServices } from '../src/services/CartServices';
// import '@testing-library/jest-dom';
// import { jest, describe, it, expect } from '@jest/globals';

// const MOCK_CARTS: Cart[] = [
//     {id: 1, id_user: 1, data_created: '2024-03-20T10:00:00.000Z'},
//     {id: 2, id_user: 2, data_created: '2024-03-20T11:00:00.000Z'},
//     {id: 3, id_user: 3, data_created: '2024-03-20T12:00:00.000Z'}, 
//     {id: 4, id_user: 4, data_created: '2024-03-20T13:00:00.000Z'},
//     {id: 5, id_user: 5, data_created: '2024-03-20T14:00:00.000Z'},
// ];

// describe('CartServices', () => {
//     describe('getAll', () => {
//         it('should return all carts', async () => {
//             const getAllSpy = jest.spyOn(CartServices, 'getAll')
//                 .mockResolvedValue({ data: MOCK_CARTS } as any);

//             const result = await CartServices.getAll();

//             expect(getAllSpy).toHaveBeenCalled();
//             expect(result.data).toEqual(MOCK_CARTS);
//         });

//         it('should return filtered carts with pagination', async () => {
//             const params = {
//                 userId: '1',
//                 skip: 0,
//                 take: 2
//             };

//             const getAllSpy = jest.spyOn(CartServices, 'getAll')
//                 .mockResolvedValue({ data: MOCK_CARTS.slice(0, 2) } as any);

//             const result = await CartServices.getAll();

//             expect(getAllSpy).toHaveBeenCalledWith();
//             expect(result.data.length).toBe(2);
//         });
//     });

//     describe('getById', () => {
//         it('should return cart by id', async () => {
//             const mockCart = MOCK_CARTS[0];
//             const getByIdSpy = jest.spyOn(CartServices, 'getById')
//                 .mockResolvedValue({ data: mockCart } as any);

//             const result = await CartServices.getById('1');

//             expect(getByIdSpy).toHaveBeenCalledWith('1');
//             expect(result.data).toEqual(mockCart);
//         });
//     });

//     describe('create', () => {
//         it('should create a new cart', async () => {
//             const newCart = {
//                 id: 6,
//                 id_user: 6,
//                 data_created: '2024-03-20T15:00:00.000Z'
//             };

//             const createSpy = jest.spyOn(CartServices, 'addCart')
//                 .mockResolvedValue({ data: { ...newCart, id: 6 } } as any);

//             const result = await CartServices.addCart(newCart.id_user);

//             expect(createSpy).toHaveBeenCalledWith(newCart.id_user);
//             expect(result.data).toHaveProperty('id');
//             expect(result.data.id_user).toBe(newCart.id_user);
//         });
//     });

//     describe('update', () => {
//         const mockCart = MOCK_CARTS[0];
//         const updatedData = {
//             id: 1,
//             id_user: 1,
//             id_product: 1,
//             quantity: 3
//         };

//         it('should update cart data', async () => {
//             const updateSpy = jest.spyOn(CartServices, 'updateCart')
//                 .mockResolvedValue({ data: { ...mockCart, ...updatedData } } as any);

//             const result = await CartServices.updateCart('1', updatedData);

//             expect(updateSpy).toHaveBeenCalledWith('1', updatedData);
//             expect(result.data.quantity).toBe(updatedData.quantity);
//         });
//     });

//     describe('delete', () => {
//         it('should delete cart by id', async () => {
//             const deleteSpy = jest.spyOn(CartServices, 'clearCart')
//                 .mockResolvedValue({} as any);

//             await CartServices.clearCart();

//             expect(deleteSpy).toHaveBeenCalledWith();
//         });
//     });
// });
