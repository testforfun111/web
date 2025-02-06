import { getJwtToken } from "../utils/UserUtils";
import { API } from "./Api";

export class CartServices {
    public static async getAll() {
        return API.get('/carts', {headers: {Authorization: getJwtToken()}});
    }
    public static async addCart(userId: number) {
        return API.post('/carts', {
            id_user: userId,
            data_created: new Date().toISOString()
        }, {headers: {Authorization: getJwtToken()}});
    }

    public static async updateCart(cartId: string, cart: any) {
        return API.put(`/carts/${cartId}`, cart, {headers: {Authorization: getJwtToken()}});
    }
    public static async getById(cartId: string) {
        return API.get(`/carts/${cartId}`, {headers: {Authorization: getJwtToken()}});
    }

    public static async clearCart() {
        return API.delete('/carts', {headers: {Authorization: getJwtToken()}});
    }
}