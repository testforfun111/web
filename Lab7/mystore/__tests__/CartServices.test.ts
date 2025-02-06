import { CartServices } from '../src/services/CartServices';
import { jest, describe, it, expect, afterEach } from '@jest/globals';
import { API } from '../src/services/Api';

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

jest.mock('../src/services/Api');
const mockedAPI = API as jest.Mocked<typeof API>;

// Mock data để test
const MOCK_CART_ITEMS = [
    { id: 1, id_user: 1, data_created: '2024-01-01'},
    { id: 2, id_user: 1, data_created: '2024-01-02' },
    { id: 3, id_user: 2, data_created: '2024-01-03' }
];

describe('CartServices', () => {
    // Clear all mocks sau mỗi test
    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    describe('getAll', () => {
        it('should return all cart items', async () => {
            mockedAPI.get.mockResolvedValueOnce({ data: MOCK_CART_ITEMS });

            const result = await CartServices.getAll();

            expect(result.data).toEqual(MOCK_CART_ITEMS);
            expect(mockedAPI.get).toHaveBeenCalledWith('/carts', {
                headers: { Authorization: 'Bearer undefined' }
            });
            expect(mockedAPI.get).toHaveBeenCalledTimes(1);
        });

        it('should handle error when fetching cart items', async () => {
            const error = new Error('Network error');
            mockedAPI.get.mockRejectedValueOnce(error);

            await expect(CartServices.getAll()).rejects.toThrow('Network error');
        });
    });

    describe('getById', () => {
        it('should return cart item by id', async () => {
            const mockCartItem = MOCK_CART_ITEMS[0];
            mockedAPI.get.mockResolvedValueOnce({ data: mockCartItem });

            const result = await CartServices.getById('1');

            expect(result.data).toEqual(mockCartItem);
            expect(mockedAPI.get).toHaveBeenCalledWith('/carts/1', {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('create', () => {
        it('should create new cart item', async () => {
            const newCartItem = {
                id_user: 1,
                data_created: expect.any(String)
            };
            const createdCartItem = { ...newCartItem, id: 4 };
            
            mockedAPI.post.mockResolvedValueOnce({ data: createdCartItem });

            const result = await CartServices.addCart(newCartItem.id_user);

            expect(result.data).toEqual(createdCartItem);
            expect(mockedAPI.post).toHaveBeenCalledWith('/carts', newCartItem, {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('update', () => {
        it('should update cart item', async () => {
            const updateData = {
                id_user: 1,
                data_created: '2024-01-01'
            };
            const updatedCartItem = { ...MOCK_CART_ITEMS[0], ...updateData };
            
            mockedAPI.put.mockResolvedValueOnce({ data: updatedCartItem });

            const result = await CartServices.updateCart('1', updateData);

            expect(result.data).toEqual(updatedCartItem);
            expect(mockedAPI.put).toHaveBeenCalledWith('/carts/1', updateData, {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('delete', () => {
        it('should delete cart item', async () => {
            mockedAPI.delete.mockResolvedValueOnce({ data: {} });

            await CartServices.clearCart();

            expect(mockedAPI.delete).toHaveBeenCalledWith('/carts', {
                headers: { Authorization: 'Bearer undefined' }
            });
        });

        it('should handle delete error', async () => {
            const error = new Error('Delete failed');
            mockedAPI.delete.mockRejectedValueOnce(error);

            await expect(CartServices.clearCart()).rejects.toThrow('Delete failed');
        });
    });
});

