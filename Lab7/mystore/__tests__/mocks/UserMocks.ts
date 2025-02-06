import { User } from "../../src/interfaces/models/User";
import { UserServices } from "../../src/services/UserServices";

export const MOCK_USERS: User[] = [
    {id: 1, login: 'test@example.com', password: 'password123', role: 'user'},
    {id: 2, login: 'test2@example.com', password: 'password123', role: 'user'},
    {id: 3, login: 'test3@example.com', password: 'password123', role: 'user'},
    {id: 4, login: 'test4@example.com', password: 'password123', role: 'user'},
    {id: 5, login: 'test5@example.com', password: 'password123', role: 'user'},
];

export const mockUserService: UserServices = {
    changeUserById: () => Promise.resolve(),
    createUser: () => Promise.resolve(),
    getUserById: () => Promise.resolve(MOCK_USERS[0]),
    getUsers: () => Promise.resolve(MOCK_USERS),
    deleteUserById: () => Promise.resolve(),
    signIn: () => Promise.resolve(MOCK_USERS[0]),
} as any;
