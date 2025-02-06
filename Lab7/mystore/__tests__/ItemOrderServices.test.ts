import { ItemOrderServices } from '../src/services/ItemOrderServices';
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
const MOCK_ITEM_ORDERS = [
    { id: 1, id_order: 1, id_product: 1, quantity: 2 },
    { id: 2, id_order: 1, id_product: 2, quantity: 1 },
    { id: 3, id_order: 2, id_product: 3, quantity: 3 }
];

describe('ItemOrderServices', () => {
    // Clear all mocks sau mỗi test
    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    describe('getAll', () => {
        it('should return all item orders', async () => {
            mockedAPI.get.mockResolvedValueOnce({ data: MOCK_ITEM_ORDERS });

            const result = await ItemOrderServices.getAll();

            expect(result.data).toEqual(MOCK_ITEM_ORDERS);
            expect(mockedAPI.get).toHaveBeenCalledWith('/itemorders', {
                params: { id_order: undefined }
            });
            expect(mockedAPI.get).toHaveBeenCalledTimes(1);
        });

        it('should handle error when fetching item orders', async () => {
            const error = new Error('Network error');
            mockedAPI.get.mockRejectedValueOnce(error);

            await expect(ItemOrderServices.getAll()).rejects.toThrow('Network error');
        });
    });

    describe('getById', () => {
        it('should return item order by id', async () => {
            const mockItemOrder = MOCK_ITEM_ORDERS[0];
            mockedAPI.get.mockResolvedValueOnce({ data: mockItemOrder });

            const result = await ItemOrderServices.getById('1');

            expect(result.data).toEqual(mockItemOrder);
            expect(mockedAPI.get).toHaveBeenCalledWith('/itemorders/1', {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('create', () => {
        it('should create new item order', async () => {
            const newItemOrder = {
                id_order: 1,
                id_product: 4,
                quantity: 2
            };
            const createdItemOrder = { ...newItemOrder, id: 4 };
            
            mockedAPI.post.mockResolvedValueOnce({ data: createdItemOrder });

            const result = await ItemOrderServices.create(newItemOrder);

            expect(result.data).toEqual(createdItemOrder);
            expect(mockedAPI.post).toHaveBeenCalledWith('/itemorders', newItemOrder, {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('update', () => {
        it('should update item order', async () => {
            const updateData = {
                id_order: 1,
                id_product: 1,
                quantity: 5
            };
            const updatedItemOrder = { ...MOCK_ITEM_ORDERS[0], ...updateData };
            
            mockedAPI.put.mockResolvedValueOnce({ data: updatedItemOrder });

            const result = await ItemOrderServices.update('1', updateData);

            expect(result.data).toEqual(updatedItemOrder);
            expect(mockedAPI.put).toHaveBeenCalledWith('/itemorders/1', updateData, {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('delete', () => {
        it('should delete item order', async () => {
            mockedAPI.delete.mockResolvedValueOnce({ data: {} });

            await ItemOrderServices.delete('1');

            expect(mockedAPI.delete).toHaveBeenCalledWith('/itemorders/1', {
                headers: { Authorization: 'Bearer undefined' }
            });
        });

        it('should handle delete error', async () => {
            const error = new Error('Delete failed');
            mockedAPI.delete.mockRejectedValueOnce(error);

            await expect(ItemOrderServices.delete('1')).rejects.toThrow('Delete failed');
        });
    });
});
