import { OrderServices } from '../src/services/OrderServices';
import { Order } from '../src/interfaces/models/Order';
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
const MOCK_ORDERS: Order[] = [
    { id: 1, id_user: 1, status: 0, data_created: '2024-01-01' },
    { id: 2, id_user: 2, status: 1, data_created: '2024-01-02' },
    { id: 3, id_user: 1, status: 2, data_created: '2024-01-03' }
];

describe('OrderServices', () => {
    // Clear all mocks sau mỗi test
    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    describe('getAll', () => {
        it('should return all orders', async () => {
            mockedAPI.get.mockResolvedValueOnce({ data: MOCK_ORDERS });

            const result = await OrderServices.getAll();

            expect(result.data).toEqual(MOCK_ORDERS);
expect(mockedAPI.get).toHaveBeenCalledWith('/orders', {
                params: { id_user: undefined }
            });
            expect(mockedAPI.get).toHaveBeenCalledTimes(1);
        });

        it('should handle error when fetching orders', async () => {
            const error = new Error('Network error');
            mockedAPI.get.mockRejectedValueOnce(error);

            await expect(OrderServices.getAll()).rejects.toThrow('Network error');
        });
    });

    describe('getById', () => {
        it('should return order by id', async () => {
            const mockOrder = MOCK_ORDERS[0];
            mockedAPI.get.mockResolvedValueOnce({ data: mockOrder });

            const result = await OrderServices.getById('1');

            expect(result.data).toEqual(mockOrder);
            expect(mockedAPI.get).toHaveBeenCalledWith('/orders/1', {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('create', () => {
        it('should create new order', async () => {
            const newOrder = {
                userId: 1,
                products: [{productId: 1, quantity: 2}],
                status: 'PENDING',
                totalPrice: 100
            };
            const createdOrder = { ...newOrder, id: 4 };
            
            mockedAPI.post.mockResolvedValueOnce({ data: createdOrder });

            const result = await OrderServices.create(newOrder);

            expect(result.data).toEqual(createdOrder);
            expect(mockedAPI.post).toHaveBeenCalledWith('/orders', newOrder, {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('update', () => {
        it('should update order', async () => {
            const updateData = {
                userId: 1,
                products: [{productId: 1, quantity: 3}],
                status: 'COMPLETED',
                totalPrice: 150
            };
            const updatedOrder = { ...MOCK_ORDERS[0], ...updateData };
            
            mockedAPI.put.mockResolvedValueOnce({ data: updatedOrder });

            const result = await OrderServices.update('1', updateData);

            expect(result.data).toEqual(updatedOrder);
            expect(mockedAPI.put).toHaveBeenCalledWith('/orders/1', updateData, {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('delete', () => {
        it('should delete order', async () => {
            mockedAPI.delete.mockResolvedValueOnce({ data: {} });

            await OrderServices.delete('1');

            expect(mockedAPI.delete).toHaveBeenCalledWith('/orders/1', {
                headers: { Authorization: 'Bearer undefined' }
            });
        });

        it('should handle delete error', async () => {
            const error = new Error('Delete failed');
            mockedAPI.delete.mockRejectedValueOnce(error);

            await expect(OrderServices.delete('1')).rejects.toThrow('Delete failed');
        });
    });
});
