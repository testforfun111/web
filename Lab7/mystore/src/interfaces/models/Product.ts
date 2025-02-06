export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  img?: string;
}

export interface ProductDto {
    name: string;
    price: number;
    quantity: number;
    description: string;
    img: string;
}
