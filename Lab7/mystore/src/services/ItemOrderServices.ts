import { getJwtToken } from "../utils/UserUtils";
import { API } from "./Api";

export class ItemOrderServices {
    public static async getAll(id_order?: string) {
        return API.get(`/itemorders`, {params: {id_order: id_order}});
    }

    public static async getById(itemId: string) {
        return API.get(`/itemorders/${itemId}`, {headers: {Authorization: getJwtToken()}});
    }

    public static async create(item: any) {
        return API.post(`/itemorders`, item, {headers: {Authorization: getJwtToken()}});
    }

    public static async update(itemId: string, item: any) {
        return API.put(`/itemorders/${itemId}`, item, {headers: {Authorization: getJwtToken()}});
    }

    public static async delete(itemId: string) {
        return API.delete(`/itemorders/${itemId}`, {headers: {Authorization: getJwtToken()}});
    }
}