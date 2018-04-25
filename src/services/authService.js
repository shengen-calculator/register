import * as authActions from '../actions/authenticationActions';

export function logIn(result) {
    return function (dispatch, getState) {
        dispatch(authActions.loginSuccess(result.user));
        return result.user;
    };
}

export function logOut() {
    return function (dispatch, getState) {
        dispatch(authActions.logoutSuccess());
    };
}