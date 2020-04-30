import { ILocationState, IActionBase } from "../models/root.interface";
import { ADD_PRODUCT, CHANGE_PRODUCT_PENDING_EDIT, EDIT_PRODUCT, REMOVE_PRODUCT,
    CLEAR_PRODUCT_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_PRODUCT_AMOUNT} from "../actions/products.action";
import { ILocation, ProductModificationStatus } from "../models/product.interface";



const initialState: ILocationState = {
    modificationState: ProductModificationStatus.None,
    selectedProduct: null,
    locations: [{
        id: 1, name: "Chocolate", description: "This is Chocolate and it is Sweet",
        latitude: 10, longitude: 4
    },
    {
        id: 2,  name: "Chocolate", description: "This is Chocolate and it is Sweet",
        latitude: 10, longitude: 4
    },
    {
        id: 3,  name: "Chocolate", description: "This is Chocolate and it is Sweet",
        latitude: 10, longitude: 4
    },
    {
        id: 4,  name: "Chocolate", description: "This is Chocolate and it is Sweet",
        latitude: 10, longitude: 4
    }]
};

function locationsReducer(state: ILocationState = initialState, action: IActionBase): ILocationState {
    switch (action.type) {
        case ADD_PRODUCT: {
            let maxId: number = Math.max.apply(Math, state.locations.map(function(o) { return o.id; }));
            action.product.id = maxId + 1;
            return { ...state, locations: [...state.locations, action.product]};
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
            return { ...state, selectedProduct: action.product };
        }
        case CLEAR_PRODUCT_PENDING_EDIT: {
            return { ...state, selectedProduct: null };
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