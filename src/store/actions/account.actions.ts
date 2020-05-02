export const LOG_IN: string = "LOG_IN";
export const LOG_OUT: string = "LOG_OUT";

export function login(email: string, loggedIn: boolean, authError: string): ILogInActionType {
    return { type: LOG_IN, email: email, loggedIn: loggedIn, authError: authError };
}

export function logout(): ILogOutActionType {
    return { type: LOG_OUT};
}

interface ILogInActionType { type: string, email: string, loggedIn: boolean, authError: string };
interface ILogOutActionType { type: string };
