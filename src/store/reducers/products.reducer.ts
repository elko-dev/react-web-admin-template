import { ILocationState, IActionBase } from "../models/root.interface";
import {
    ADD_PRODUCT, CHANGE_PRODUCT_PENDING_EDIT, EDIT_PRODUCT, REMOVE_PRODUCT,
    CLEAR_PRODUCT_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_PRODUCT_AMOUNT
} from "../actions/products.action";
import { ILocation, ProductModificationStatus } from "../models/product.interface";
import { LocationService } from "../../service/LocationService";



const initialState: ILocationState = {
    modificationState: ProductModificationStatus.None,
    selectedLocation: null,
    locations: [{
        id: 1, name: "Chocolate", description: "This is Chocolate and it is Sweet",
        latitude: 10, longitude: 4
    },
    {
        id: 2, name: "Chocolate", description: "This is Chocolate and it is Sweet",
        latitude: 10, longitude: 4
    },
    {
        id: 3, name: "Chocolate", description: "This is Chocolate and it is Sweet",
        latitude: 10, longitude: 4
    },
    {
        id: 4, name: "Chocolate", description: "This is Chocolate and it is Sweet",
        latitude: 10, longitude: 4
    }]
};

function locationsReducer(state: ILocationState = initialState, action: IActionBase): ILocationState {
    switch (action.type) {
        case ADD_PRODUCT: {
            const locationService: LocationService = new LocationService();
            locationService.createLocation({
                description: action.product.description,
                latitude: action.product.latitude,
                longitude: action.product.longitude,
                name: action.product.name
            }).then((newLocation: ILocation) => {
                return { ...state, locations: [...state.locations, newLocation] };
            })
            .catch((error)=>{
                console.log(error);
                alert('error saving new location');
            });
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