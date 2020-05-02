import { IActionBase } from "../models/root.interface";
import { IAccount } from "../models/account.interface";
import { LOG_IN, LOG_OUT, login } from "../actions/account.actions";
import { firebaseAuth } from "../../config/auth.config";

const initialState: IAccount = {
    email: "admin@react-template.pl",
    loggedIn: false,
    authError: ""
};

export function loginUser(email: string, password: string) {
    return function (dispatch: any) {
        firebaseAuth.signInWithEmailAndPassword(email, password)
            .then((firebaseUser: firebase.auth.UserCredential) => {
                console.log('logged in with user ', firebaseUser);
                dispatch(login(email, true, ""));
            })
            .catch((error) => {
                alert('failed to login');
                dispatch(login(email, false, error.message));
            });
    }

}
function accountReducer(state: IAccount = initialState, action: IActionBase): IAccount {
    switch (action.type) {
        case LOG_IN: {
            return { ...state, email: action.email, authError: action.authError, loggedIn: action.loggedIn };
        }
        case LOG_OUT: {
            return { ...state, email: "" };
        }
        default:
            return state;
    }
}


export default accountReducer;