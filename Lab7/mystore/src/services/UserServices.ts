import axios, { AxiosResponse } from "axios";
import { SignInDto, RawUserDto, User } from "../interfaces/models/User";
import { deleteJwtToken, getJwtToken } from "../utils/UserUtils";
import { API } from "./Api";
import { deleteUser, setUser } from "../utils/UserUtils";

export class UserServices {
    public static async signIn(credentials: SignInDto) {
        const res = await API.get('/users/login', {params: credentials});

        setUser(res.data);
        return res;
    }

    public static register(credentials: RawUserDto): Promise<AxiosResponse<User>> {
        return API.post('/users/register', credentials);
    }

    public static getAll(startWith?: string, skip?: number, take?: number): Promise<AxiosResponse<User[]>> {
        return API.get('/users', {params: {startWith: startWith, skip: skip, take: take}});
    }

    public static getById(id: string): Promise<AxiosResponse<User>> {
        return API.get(`/users/${id}`);
    }

    public static patch(id: string, patchUser: RawUserDto): Promise<AxiosResponse<User>> {
        return API.patch(`/users/${id}`, patchUser, {headers: {Authorization: getJwtToken()}});
    }
    public static update(id: string, updateUser: RawUserDto): Promise<AxiosResponse<User>> {
        return API.put(`/users/${id}`, updateUser, {headers: {Authorization: getJwtToken()}});
    }
    public static delete(id: string): Promise<AxiosResponse<void>> {
        return API.delete(`/users/${id}`, {headers: {Authorization: getJwtToken()}});
    }

    public static logout() {
        deleteJwtToken();
        deleteUser();
    }
}