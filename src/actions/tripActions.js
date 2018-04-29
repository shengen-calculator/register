import * as types from './actionTypes';

export function addTripSuccess(trip) {
    return { type: types.TRIP_ADD_SUCCESS, trip };
}
export function updateTripSuccess(trip) {
    return { type: types.TRIP_UPDATE_SUCCESS, trip };
}
