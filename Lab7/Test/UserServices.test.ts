// import { User } from '../src/interfaces/models/User';
// import { UserServices } from '../src/services/UserServices';
// import '@testing-library/jest-dom';
// import { jest, describe, it, expect } from '@jest/globals';
// import { MOCK_USERS } from './mocks/UserMocks';

// describe('UserServices', () => {
//     describe('signIn', () => {
//         const mockUser = MOCK_USERS[0];

//         it('should successfully sign in a user', async () => {
//             const credentials = {
//                 login: mockUser.login,
//                 password: mockUser.password
//             };

//             const signInSpy = jest.spyOn(UserServices, 'signIn')
//                 .mockResolvedValue({ data: mockUser } as any);

//             const result = await UserServices.signIn(credentials);

//             expect(signInSpy).toHaveBeenCalledWith(credentials);
//             expect(result.data).toEqual(mockUser);
//         });

//         it('should reject with error for invalid credentials', async () => {
//             const invalidCredentials = {
//                 login: 'wrong@example.com',
//                 password: 'wrongpassword'
//             };

//             const signInSpy = jest.spyOn(UserServices, 'signIn')
//                 .mockRejectedValue(new Error('Invalid credentials'));

//             await expect(UserServices.signIn(invalidCredentials))
//                 .rejects
//                 .toThrow('Invalid credentials');
            
//             expect(signInSpy).toHaveBeenCalledWith(invalidCredentials);
//         });
//     });

//     describe('register', () => {
//         const mockUser = MOCK_USERS[0];

//         it('should successfully register a new user', async () => {
//             const newUser = {
//                 login: 'newuser@example.com',
//                 password: 'newpassword123',
//                 role: 'user'
//             };

//             const registerSpy = jest.spyOn(UserServices, 'register')
//                 .mockResolvedValue({ data: { ...newUser, id: 6 } } as any);

//             const result = await UserServices.register(newUser);

//             expect(registerSpy).toHaveBeenCalledWith(newUser);
//             expect(result.data).toHaveProperty('id');
//             expect(result.data.login).toBe(newUser.login);
//         });
//     });

//     describe('getById', () => {
//         it('should return user by id', async () => {
//             const mockUser = MOCK_USERS[0];
//             const getByIdSpy = jest.spyOn(UserServices, 'getById')
//                 .mockResolvedValue({ data: mockUser } as any);

//             const result = await UserServices.getById('1');

//             expect(getByIdSpy).toHaveBeenCalledWith('1');
//             expect(result.data).toEqual(mockUser);
//         });
//     });

//     describe('patch and update', () => {
//         const mockUser = MOCK_USERS[0];
//         const updatedData = { login: 'updated@example.com', password: 'updatedpassword123', role: 'user' };

//         it('should patch user data', async () => {
//             const patchSpy = jest.spyOn(UserServices, 'patch')
//                 .mockResolvedValue({ data: { ...mockUser, ...updatedData } } as any);

//             const result = await UserServices.patch('1', updatedData);

//             expect(patchSpy).toHaveBeenCalledWith('1', updatedData);
//             expect(result.data.login).toBe(updatedData.login);
//         });

//         it('should update user data', async () => {
//             const updateSpy = jest.spyOn(UserServices, 'update')
//                 .mockResolvedValue({ data: { ...mockUser, ...updatedData } } as any);

//             const result = await UserServices.update('1', updatedData);

//             expect(updateSpy).toHaveBeenCalledWith('1', updatedData);
//             expect(result.data.login).toBe(updatedData.login);
//         });
//     });

//     describe('delete', () => {
//         it('should delete user by id', async () => {
//             const deleteSpy = jest.spyOn(UserServices, 'delete')
//                 .mockResolvedValue({} as any);

//             await UserServices.delete('1');

//             expect(deleteSpy).toHaveBeenCalledWith('1');
//         });
//     });
// });
