import { ILocation } from "./product.interface";

export interface IOrder {
    id: number;
    name: string;
    product: ILocation;
    amount: number;
    totalPrice: number;
}