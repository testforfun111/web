import { getJwtToken } from "../utils/UserUtils";
import { API } from "./Api";

export class ItemCartServices {
    public static async getAll(cartId?: string) {
        return API.get(`/itemcarts`, {params: {id_cart: cartId}});
    }

    public static async getByIdCart(id: string) {
        return API.get(`/itemcarts/${id}`, {headers: {Authorization: getJwtToken()}});
    }

    public static async addItem(item: any) {
        return API.post(`/itemcarts`, item, {headers: {Authorization: getJwtToken()}});
    }

    public static async updateItem(id: string, item: any) {
        return API.put(`/itemcarts/${id}`, item, {headers: {Authorization: getJwtToken()}});
    }

    public static async removeItem(id: string) {
        return API.delete(`/itemcarts/${id}`, {headers: {Authorization: getJwtToken()}});
    }
}
