import * as authActions from '../actions/authenticationActions';
import {beginAjaxCall} from "../actions/ajaxStatusActions";

export function logIn(result) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        dispatch(authActions.loginSuccess(result.user));
        return result.user;
    };
}

export function logOut() {
    return function (dispatch, getState) {
        dispatch(authActions.logoutSuccess());
    };
}