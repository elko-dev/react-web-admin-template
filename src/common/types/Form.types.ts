import { ILocation } from "../../store/models/product.interface";

export type OnChangeModel = {
    value: string | number | boolean,
    error: string,
    touched: boolean,
    field: string
};

export interface IFormStateField<T> {error: string, value: T};

export interface ILocationFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    latitude: IFormStateField<number>;
    longitude: IFormStateField<number>;
}

export  interface IOrderFormState {
    name: IFormStateField<string>;
    product: IFormStateField<ILocation | null>;
    latitude: IFormStateField<number>;
    longitude: IFormStateField<number>;
};