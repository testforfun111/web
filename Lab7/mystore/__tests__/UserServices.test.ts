import { UserServices } from '../src/services/UserServices';
import { User } from '../src/interfaces/models/User';
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
const MOCK_USERS: User[] = [
    { id: 1, login: 'user1', password: 'password1', role: 'USER' },
    { id: 2, login: 'user2', password: 'password2', role: 'USER' },
    { id: 3, login: 'admin', password: 'password3', role: 'ADMIN' }
];

describe('UserServices', () => {
    // Clear all mocks sau mỗi test
    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    describe('getAll', () => {
        it('should return all users', async () => {
            mockedAPI.get.mockResolvedValueOnce({ data: MOCK_USERS });

            const result = await UserServices.getAll();

            expect(result.data).toEqual(MOCK_USERS);
            expect(mockedAPI.get).toHaveBeenCalledWith('/users', {
            params: {
                skip: undefined,
                take: undefined,
                startWith: undefined
                }
            });
            expect(mockedAPI.get).toHaveBeenCalledTimes(1);
        });

        it('should handle error when fetching users', async () => {
            const error = new Error('Network error');
            mockedAPI.get.mockRejectedValueOnce(error);

            await expect(UserServices.getAll()).rejects.toThrow('Network error');
        });
    });

    describe('getById', () => {
        it('should return user by id', async () => {
            const mockUser = MOCK_USERS[0];
            mockedAPI.get.mockResolvedValueOnce({ data: mockUser });

            const result = await UserServices.getById('1');

            expect(result.data).toEqual(mockUser);
            expect(mockedAPI.get).toHaveBeenCalledWith('/users/1');
        });
    });

    describe('login', () => {
        it('should login successfully', async () => {
            const loginData = {
                login: 'user1',
                password: 'password1'
            };
            const mockUser = MOCK_USERS[0];
            
            // Mock API call - phải dùng get thay vì post vì service dùng get
            mockedAPI.get.mockResolvedValueOnce({ data: mockUser });

            const result = await UserServices.signIn(loginData);

            expect(result).toBeDefined();
            expect(result?.data).toEqual(mockUser);
            expect(mockedAPI.get).toHaveBeenCalledWith('/users/login', {
                params: loginData
            });
        });

        it('should handle login error', async () => {
            const loginData = {
                login: 'user1',
                password: 'wrong-password'
            };
            
            const error = new Error('Invalid credentials');
            mockedAPI.get.mockRejectedValueOnce(error);

            await expect(UserServices.signIn(loginData)).rejects.toThrow('Invalid credentials');
        });
    });

    describe('register', () => {
        it('should register new user', async () => {
            const newUser = {
                login: 'newuser',
                password: 'password123',
                role: 'USER'
            };
            const registeredUser = { ...newUser, id: 4, role: 'USER' };
            
            mockedAPI.post.mockResolvedValueOnce({ data: registeredUser });

            const result = await UserServices.register(newUser);

            expect(result.data).toEqual(registeredUser);
            expect(mockedAPI.post).toHaveBeenCalledWith('/users/register', newUser);
        });
    });

    describe('update', () => {
        it('should update user', async () => {
            const updateData = {
                id: 1,
                login: 'updateduser1',
                password: 'updated1@test.com',
                role: 'USER'
            };
            const updatedUser = { ...MOCK_USERS[0], ...updateData };
            
            mockedAPI.put.mockResolvedValueOnce({ data: updatedUser });

            const result = await UserServices.update('1', updateData);

            expect(result.data).toEqual(updatedUser);
            expect(mockedAPI.put).toHaveBeenCalledWith('/users/1', updateData, {
                headers: { Authorization: 'Bearer undefined' }
            });
        });
    });

    describe('delete', () => {
        it('should delete user', async () => {
            mockedAPI.delete.mockResolvedValueOnce({ data: {} });

            await UserServices.delete('1');

            expect(mockedAPI.delete).toHaveBeenCalledWith('/users/1', {
                headers: { Authorization: 'Bearer undefined' }
            });
        });

        it('should handle delete error', async () => {
            const error = new Error('Delete failed');
            mockedAPI.delete.mockRejectedValueOnce(error);

            await expect(UserServices.delete('1')).rejects.toThrow('Delete failed');
        });
    });

    describe('patch', () => {
        it('should patch user', async () => {
            const patchData = {
                login: 'patcheduser1',
                password: 'patched1@test.com',
                role: 'USER'
            };
            const patchedUser = { ...MOCK_USERS[0], ...patchData };
            
            mockedAPI.patch.mockResolvedValueOnce({ data: patchedUser });

            const result = await UserServices.patch('1', patchData);

            expect(result.data).toEqual(patchedUser);
            expect(mockedAPI.patch).toHaveBeenCalledWith('/users/1', patchData, {
                headers: { Authorization: 'Bearer undefined' }
            });
        });

        it('should handle patch error', async () => {
            const error = new Error('Patch failed');
            mockedAPI.patch.mockRejectedValueOnce(error);

            await expect(UserServices.patch('1', {login: 'patcheduser1', password: 'patched1@test.com', role: 'USER'})).rejects.toThrow('Patch failed');
        });
    });

    describe('logout', () => {
        it('should clear user data from localStorage', () => {
            UserServices.logout();
            
            expect(localStorage.removeItem).toHaveBeenCalledWith('user');
            expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
        });
    });
});
