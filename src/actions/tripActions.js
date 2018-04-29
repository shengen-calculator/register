import * as types from './actionTypes';

export function addTripSuccess(trip) {
    return { type: types.TRIP_ADD_SUCCESS, trip };
}
export function updateTripSuccess(trip) {
    return { type: types.TRIP_UPDATE_SUCCESS, trip };
}

export function tripOutSuccess() {
    return { type: types.TRIP_OUT_SUCCESS };
}
export function tripBackSuccess() {
    return { type: types.TRIP_BACK_SUCCESS };
}

