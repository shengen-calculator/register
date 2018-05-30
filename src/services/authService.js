import * as authActions from '../actions/authenticationActions';
import {beginAjaxCall} from "../actions/ajaxStatusActions";

export function logIn(result) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        dispatch(authActions.loginSuccess(result));
        localStorage.setItem('USER', JSON.stringify({
            displayName: result.displayName,
            uid: result.uid,
            email: result.email
        }));
        return result;
    };
}

export function logOut() {
    return function (dispatch, getState) {
        dispatch(authActions.logoutSuccess());
    };
}