import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function tripsReducer(state = initialState.trips, action) {
    switch (action.type) {

        case types.TRIP_ADD_SUCCESS:
            if (action.trip) {
                return [
                    ...state,
                    Object.assign({}, action.trip.item.back ? {
                        id: action.trip.key,
                        out: action.trip.item.out,
                        back: action.trip.item.back
                    } : {
                        id: action.trip.key,
                        out: action.trip.item.out
                    })
                ];

            } else {
                return state;
            }

        case types.TRIP_UPDATE_SUCCESS:
            if (action.trip) {
                return [
                    ...state.filter(trip => trip.id !== action.trip.id),
                    Object.assign({}, action.trip)
                ];
            } else {
                return state;
            }


        default:
            return state;
    }
}