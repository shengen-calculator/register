import * as authActions from '../actions/authenticationActions';
import {beginAjaxCall} from "../actions/ajaxStatusActions";
import {auth} from '../api/database';
import tripApi from '../api/fireBaseTripApi';

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

export function logOut(uid) {
    return function (dispatch, getState) {
        if (uid) {
            tripApi.unSubscribeTripsChanges(uid);
        }
        return auth.signOut().then(() => {
            localStorage.removeItem("USER");
            dispatch(authActions.logoutSuccess());
        }).catch(error => {
            throw(error);
        });

    };
}