import { getJwtToken } from "../utils/UserUtils";
import { API } from "./Api";

export class OrderServices {
    public static async getAll(id_user?: string) {
        return API.get('/orders', {params: {id_user: id_user}});
    }

    public static async getById(id: string) {
        return API.get(`/orders/${id}`, {headers: {Authorization: getJwtToken()}});
    }

    public static async create(order: any) {
        return API.post('/orders', order, {headers: {Authorization: getJwtToken()}});
    }

    public static async update(id: string, order: any) {
        return API.put(`/orders/${id}`, order, {headers: {Authorization: getJwtToken()}});
    }

    public static async delete(id: string) {
        return API.delete(`/orders/${id}`, {headers: {Authorization: getJwtToken()}});
    }
}