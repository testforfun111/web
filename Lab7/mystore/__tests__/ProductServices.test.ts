import { ProductServices } from '../src/services/ProductServices';
import { Product } from '../src/interfaces/models/Product';
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
const MOCK_PRODUCTS: Product[] = [
    { id: 1, name: 'Product 1', price: 100, description: 'Description 1', quantity: 1, img: 'image1.jpg' },
    { id: 2, name: 'Product 2', price: 200, description: 'Description 2', quantity: 1, img: 'image2.jpg' },
    { id: 3, name: 'Product 3', price: 300, description: 'Description 3', quantity: 1, img: 'image3.jpg' },
];

describe('ProductServices', () => {
    // Clear all mocks sau mỗi test
    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    describe('getAll', () => {
        it('should return all products', async () => {
            // Setup mock response
            mockedAPI.get.mockResolvedValueOnce({ data: MOCK_PRODUCTS });

            // Gọi service
            const result = await ProductServices.getAll();

            // Verify kết quả
            expect(result.data).toEqual(MOCK_PRODUCTS);
            expect(mockedAPI.get).toHaveBeenCalledWith('/products', {"params": {"startWith": undefined}});
            expect(mockedAPI.get).toHaveBeenCalledTimes(1);
        });

        it('should handle error when fetching products', async () => {
            // Setup mock error
            const error = new Error('Network error');
            mockedAPI.get.mockRejectedValueOnce(error);

            // Verify error handling
            await expect(ProductServices.getAll()).rejects.toThrow('Network error');
        });
    });

    describe('getById', () => {
        it('should return product by id', async () => {
            const mockProduct = MOCK_PRODUCTS[0];
            mockedAPI.get.mockResolvedValueOnce({ data: mockProduct });

            const result = await ProductServices.getById('1');

            expect(result.data).toEqual(mockProduct);
            expect(mockedAPI.get).toHaveBeenCalledWith('/products/1');
        });
    });

    describe('create', () => {
        it('should create new product', async () => {
            const newProduct = {
                name: 'New Product',
                price: 150,
                description: 'New Description',
                quantity: 1,
                img: 'new-image.jpg'
            };
            const createdProduct = { ...newProduct, id: 4 };
            
            mockedAPI.post.mockResolvedValueOnce({ data: createdProduct });

            const result = await ProductServices.create(newProduct);

            expect(result.data).toEqual(createdProduct);
            expect(mockedAPI.post).toHaveBeenCalledWith('/products', newProduct, {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('update', () => {
        it('should update product', async () => {
            const updateData = {
                id: 1,
                name: 'Updated Product',
                price: 180,
                description: 'Description 1',
                quantity: 1,
                img: 'image1.jpg'
            };
            const updatedProduct = { ...MOCK_PRODUCTS[0], ...updateData };
            
            mockedAPI.put.mockResolvedValueOnce({ data: updatedProduct });

            const result = await ProductServices.update('1', updateData);

            expect(result.data).toEqual(updatedProduct);
            expect(mockedAPI.put).toHaveBeenCalledWith('/products/1', updateData, {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('delete', () => {
        it('should delete product', async () => {
            mockedAPI.delete.mockResolvedValueOnce({ data: {} });

            await ProductServices.delete('1');

            expect(mockedAPI.delete).toHaveBeenCalledWith('/products/1', {
                headers: { Authorization: 'Bearer undefined' }
            });
        });

        it('should handle delete error', async () => {
            const error = new Error('Delete failed');
            mockedAPI.delete.mockRejectedValueOnce(error);

            await expect(ProductServices.delete('1')).rejects.toThrow('Delete failed');
        });
    });

    // describe('error handling', () => {
    //     it('should handle network errors', async () => {
    //         const networkError = new Error('Network Error');
    //         mockedAPI.get.mockRejectedValueOnce(networkError);

    //         await expect(ProductServices.getAll()).rejects.toThrow('Network Error');
    //     });

    //     it('should handle 404 errors', async () => {
    //         const notFoundError = {
    //             response: { status: 404, data: { message: 'Product not found' } }
    //         };
    //         mockedAPI.get.mockRejectedValueOnce(notFoundError);

    //         await expect(ProductServices.getById('999')).rejects.toThrow('Product not found');
    //     });

    //     it('should handle validation errors', async () => {
    //         const validationError = {
    //             response: { 
    //                 status: 400, 
    //                 data: { message: 'Invalid product data' }
    //             }
    //         };
    //         mockedAPI.post.mockRejectedValueOnce(validationError);

    //         const invalidProduct = {
    //             name: '',
    //             price: -1,
    //             description: '',
    //             quantity: 0,
    //             img: ''
    //         };

    //         await expect(ProductServices.create(invalidProduct)).rejects.toThrow('Invalid product data');
    //     });
    // });
});