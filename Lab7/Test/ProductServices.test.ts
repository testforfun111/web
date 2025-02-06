// import { Product, ProductDto } from '../src/interfaces/models/Product';
// import { ProductServices } from '../src/services/ProductServices';
// import '@testing-library/jest-dom';
// import { jest, describe, it, expect } from '@jest/globals';

// const MOCK_PRODUCTS: Product[] = [
//     {id: 1, name: 'Test Product 1', price: 99.99, description: 'Description 1', quantity: 1, img: 'image1.jpg'},
//     {id: 2, name: 'Test Product 2', price: 149.99, description: 'Description 2', quantity: 1, img: 'image2.jpg'},
//     {id: 3, name: 'Test Product 3', price: 199.99, description: 'Description 3', quantity: 1, img: 'image3.jpg'},
//     {id: 4, name: 'Test Product 4', price: 299.99, description: 'Description 4', quantity: 1, img: 'image4.jpg'},
//     {id: 5, name: 'Test Product 5', price: 399.99, description: 'Description 5', quantity: 1, img: 'image5.jpg'},
// ];

// describe('ProductServices', () => {
//     describe('getAll', () => {
//         it('should return all products', async () => {
//             const getAllSpy = jest.spyOn(ProductServices, 'getAll')
//                 .mockResolvedValue({ data: MOCK_PRODUCTS } as any);

//             const result = await ProductServices.getAll();

//             expect(getAllSpy).toHaveBeenCalled();
//             expect(result.data).toEqual(MOCK_PRODUCTS);
//         });

//         it('should return filtered products with pagination', async () => {
//             const params = {
//                 startWith: 'Test',
//                 skip: 0,
//                 take: 2
//             };

//             const getAllSpy = jest.spyOn(ProductServices, 'getAll')
//                 .mockResolvedValue({ data: MOCK_PRODUCTS.slice(0, 2) } as any);

//             const result = await ProductServices.getAll(params.startWith);

//             expect(getAllSpy).toHaveBeenCalledWith(params.startWith);
//             expect(result.data.length).toBe(2);
//         });
//     });

//     describe('getById', () => {
//         it('should return product by id', async () => {
//             const mockProduct = MOCK_PRODUCTS[0];
//             const getByIdSpy = jest.spyOn(ProductServices, 'getById')
//                 .mockResolvedValue({ data: mockProduct } as any);

//             const result = await ProductServices.getById('1');

//             expect(getByIdSpy).toHaveBeenCalledWith('1');
//             expect(result.data).toEqual(mockProduct);
//         });
//     });

//     describe('create', () => {
//         it('should create a new product', async () => {
//             const newProduct = {
//                 name: 'New Product',
//                 price: 499.99,
//                 description: 'New Description',
//                 quantity: 1,
//                 img: 'new-image.jpg'
//             };
            

//             const createSpy = jest.spyOn(ProductServices, 'create')
//                 .mockResolvedValue({ data: { ...newProduct, id: 6 } } as any);

//             const result = await ProductServices.create(newProduct as ProductDto);

//             expect(createSpy).toHaveBeenCalledWith(newProduct as ProductDto);
//             expect(result.data).toHaveProperty('id');
//             expect(result.data.name).toBe(newProduct.name);
//         });
//     });

//     describe('update', () => {
//         const mockProduct = MOCK_PRODUCTS[0];
//         const updatedData = { 
//             id: 1,
//             name: 'Updated Product', 
//             price: 599.99, 
//             description: 'Updated Description',
//             quantity: 1,
//             img: 'updated-image.jpg'
//         };

//         it('should update product data', async () => {
//             const updateSpy = jest.spyOn(ProductServices, 'update')
//                 .mockResolvedValue({ data: { ...mockProduct, ...updatedData } } as any);

//             const result = await ProductServices.update('1', updatedData);

//             expect(updateSpy).toHaveBeenCalledWith('1', updatedData);
//             expect(result.data.name).toBe(updatedData.name);
//         });
//     });

//     describe('delete', () => {
//         it('should delete product by id', async () => {
//             const deleteSpy = jest.spyOn(ProductServices, 'delete')
//                 .mockResolvedValue({} as any);

//             await ProductServices.delete('1');

//             expect(deleteSpy).toHaveBeenCalledWith('1');
//         });
//     });
// });
