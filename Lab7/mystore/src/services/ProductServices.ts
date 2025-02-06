import { AxiosResponse } from "axios";
import { Product, ProductDto } from "../interfaces/models/Product";
import { getJwtToken } from "../utils/UserUtils";
import { API } from "./Api";

export class ProductServices {
    public static async getAll(startWith?: string) {
        return API.get('/products', {params: {startWith: startWith}});
    }

    public static async getById(id: string) {
        return API.get(`/products/${id}`);
    }

    public static async create(product: ProductDto): Promise<AxiosResponse<ProductDto>> {
        return API.post('/products', product, {headers: {Authorization: getJwtToken()}});
    }

    public static async update(id: string, product: Product): Promise<AxiosResponse<Product>> {
        return API.put(`/products/${id}`, product, {headers: {Authorization: getJwtToken()}});
    }

    public static async delete(id: string) {
        return API.delete(`/products/${id}`, {headers: {Authorization: getJwtToken()}});
    }
}