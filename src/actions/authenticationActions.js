import * as types from './actionTypes';

export function loginSuccess(account) {
    return { type: types.USER_AUTHENTICATION_SUCCESS, account };
}

export function logoutSuccess() {
    return { type: types.LOG_OUT };
}