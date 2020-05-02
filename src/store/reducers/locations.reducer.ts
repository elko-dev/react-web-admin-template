import { ILocationState, IActionBase } from "../models/root.interface";
import {
    ADD_PRODUCT, CHANGE_PRODUCT_PENDING_EDIT, EDIT_PRODUCT, REMOVE_PRODUCT,
    CLEAR_PRODUCT_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_PRODUCT_AMOUNT
} from "../actions/locations.action";
import { ILocation, ProductModificationStatus } from "../models/product.interface";
import { LocationService, LocationRequest } from "../../service/LocationService";
import * as actions from '../actions/locations.action';


export function createLocation(location: ILocation) {

    const locationService: LocationService = new LocationService();

    return function (dispatch: any) {
        locationService.createLocation(location)
            .then((newLocation: ILocation) => {
                dispatch(actions.addProduct(newLocation))
            })
            .catch((error) => {
                console.log(error);
                alert('error saving new location')
            })
    };
}

export function fetchLocations() {

    const locationService: LocationService = new LocationService();

    return function (dispatch: any) {
        locationService.getLocations()
            .then((locations: ILocation[]) => {
                dispatch(actions.loadLocations(locations))
            })
            .catch((error) => {
                console.log(error);
                alert('error saving fetching location')
            })
    };
}

const initialState: ILocationState = {
    modificationState: ProductModificationStatus.None,
    selectedLocation: null,
    locations: []
};

function locationsReducer(state: ILocationState = initialState, action: IActionBase): ILocationState {
    switch (action.type) {
        case actions.LOAD_LOCATIONS: {
            return { ...state, locations: [...state.locations, action.products] };
        }
        case ADD_PRODUCT: {

            return { ...state, locations: [...state.locations, action.product] };
        }
        case EDIT_PRODUCT: {
            const foundIndex: number = state.locations.findIndex(pr => pr.id === action.product.id);
            let products: ILocation[] = state.locations;
            products[foundIndex] = action.product;
            return { ...state, locations: products };
        }
        case REMOVE_PRODUCT: {
            return { ...state, locations: state.locations.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_PRODUCT_PENDING_EDIT: {
            return { ...state, selectedLocation: action.product };
        }
        case CLEAR_PRODUCT_PENDING_EDIT: {
            return { ...state, selectedLocation: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        case CHANGE_PRODUCT_AMOUNT: {
            let products: ILocation[] = state.locations;
            return { ...state, locations: products };
        }
        default:
            return state;
    }
}


export default locationsReducer;