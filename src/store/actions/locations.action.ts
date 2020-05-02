import { ILocation, ProductModificationStatus } from "../models/product.interface";
export const ADD_PRODUCT: string = "ADD_PRODUCT";
export const EDIT_PRODUCT: string = "EDIT_PRODUCT";
export const REMOVE_PRODUCT: string = "REMOVE_PRODUCT";
export const CHANGE_PRODUCT_AMOUNT: string = "CHANGE_PRODUCT_AMOUNT";
export const CHANGE_PRODUCT_PENDING_EDIT: string = "CHANGE_PRODUCT_PENDING_EDIT";
export const CLEAR_PRODUCT_PENDING_EDIT: string = "CLEAR_PRODUCT_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const LOAD_LOCATIONS: string = "LOAD_LOCATIONS";

export function addProduct(product: ILocation): IAddProductActionType {
    return { type: ADD_PRODUCT, product: product };
}

export function loadLocations(products: ILocation[]): ILoadLocations {
    return { type: LOAD_LOCATIONS, products: products };
}

export function editProduct(product: ILocation): IEditProductActionType {
    return { type: EDIT_PRODUCT, product: product };
}

export function removeProduct(id: number): IRemoveProductActionType {
    return { type: REMOVE_PRODUCT, id: id };
}

export function changeProductAmount(id: number, amount: number): IChangeProductAmountType {
    return { type: CHANGE_PRODUCT_AMOUNT, id: id, amount: amount };
}

export function changeSelectedProduct(product: ILocation): IChangeSelectedProductActionType {
    return { type: CHANGE_PRODUCT_PENDING_EDIT, product: product };
}

export function clearSelectedProduct(): IClearSelectedProductActionType {
    return { type: CLEAR_PRODUCT_PENDING_EDIT };
}

export function setModificationState(value: ProductModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddProductActionType { type: string, product: ILocation };
interface ILoadLocations { type: string, products: ILocation[] };
interface IEditProductActionType { type: string, product: ILocation };
interface IRemoveProductActionType { type: string, id: number };
interface IChangeSelectedProductActionType { type: string, product: ILocation };
interface IClearSelectedProductActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ProductModificationStatus};
interface IChangeProductAmountType {type: string, id: number, amount: number};