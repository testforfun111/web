import { ItemCartServices } from '../src/services/ItemCartServices';
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
const MOCK_ITEM_CARTS = [
    { id: 1, id_cart: 1, id_product: 1, quantity: 2 },
    { id: 2, id_cart: 1, id_product: 2, quantity: 1 },
    { id: 3, id_cart: 2, id_product: 3, quantity: 3 }
];

describe('ItemCartServices', () => {
    // Clear all mocks sau mỗi test
    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    describe('getAll', () => {
        it('should return all item carts', async () => {
            mockedAPI.get.mockResolvedValueOnce({ data: MOCK_ITEM_CARTS });

            const result = await ItemCartServices.getAll();

            expect(result.data).toEqual(MOCK_ITEM_CARTS);
            expect(mockedAPI.get).toHaveBeenCalledWith('/itemcarts', {
                params: { id_cart: undefined }
            });
            expect(mockedAPI.get).toHaveBeenCalledTimes(1);
        });

        it('should handle error when fetching item carts', async () => {
            const error = new Error('Network error');
            mockedAPI.get.mockRejectedValueOnce(error);

            await expect(ItemCartServices.getAll()).rejects.toThrow('Network error');
        });
    });

    describe('getById', () => {
        it('should return item cart by id', async () => {
            const mockItemCart = MOCK_ITEM_CARTS[0];
            mockedAPI.get.mockResolvedValueOnce({ data: mockItemCart });

            const result = await ItemCartServices.getByIdCart('1');

            expect(result.data).toEqual(mockItemCart);
            expect(mockedAPI.get).toHaveBeenCalledWith('/itemcarts/1', {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('create', () => {
        it('should create new item cart', async () => {
            const newItemCart = {
                id_cart: 1,
                id_product: 4,
                quantity: 2
            };
            const createdItemCart = { ...newItemCart, id: 4 };
            
            mockedAPI.post.mockResolvedValueOnce({ data: createdItemCart });

            const result = await ItemCartServices.addItem(newItemCart);

            expect(result.data).toEqual(createdItemCart);
            expect(mockedAPI.post).toHaveBeenCalledWith('/itemcarts', newItemCart, {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('update', () => {
        it('should update item cart', async () => {
            const updateData = {
                id_cart: 1,
                id_product: 1,
                quantity: 5
            };
            const updatedItemCart = { ...MOCK_ITEM_CARTS[0], ...updateData };
            
            mockedAPI.put.mockResolvedValueOnce({ data: updatedItemCart });

            const result = await ItemCartServices.updateItem('1', updateData);

            expect(result.data).toEqual(updatedItemCart);
            expect(mockedAPI.put).toHaveBeenCalledWith('/itemcarts/1', updateData, {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('delete', () => {
        it('should delete item cart', async () => {
            mockedAPI.delete.mockResolvedValueOnce({ data: {} });

            await ItemCartServices.removeItem('1');

            expect(mockedAPI.delete).toHaveBeenCalledWith('/itemcarts/1', {
                headers: { Authorization: 'Bearer undefined' }
            });
        });

        it('should handle delete error', async () => {
            const error = new Error('Delete failed');
            mockedAPI.delete.mockRejectedValueOnce(error);

            await expect(ItemCartServices.removeItem('1')).rejects.toThrow('Delete failed');
        });
    });
});
