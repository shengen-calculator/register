import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authenticationReducer(state = initialState.authentication, action) {
    switch (action.type) {
        case types.USER_AUTHENTICATION_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                name: action.account.displayName,
                uid: action.account.uid,
                email: action.account.email
            };

        case types.LOG_OUT:
            return {
                ...state,
                loggedIn: false,
                name: '',
                uid: '',
                email: '',
                dataLoaded: false
            };

        case types.LOAD_TRIPS_SUCCESS:
            return {
                ...state,
                dataLoaded: true
            };



        default:
            return state;
    }
}