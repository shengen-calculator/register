import initialState from './initialState';
import * as types from '../actions/actionTypes';
import moment from 'moment';


export default function tripsReducer(state = initialState.trips, action) {
    switch (action.type) {

        case types.TRIP_ADD_SUCCESS:
            if (action.trip) {
                const oldTrip = state.filter(trip => trip.id === action.trip.id);
                if (oldTrip.length === 0) {
                    return [
                        ...state,
                        Object.assign({}, action.trip.back ? {
                            id: action.trip.id,
                            out: action.trip.out,
                            back: action.trip.back
                        } : {
                            id: action.trip.id,
                            out: action.trip.out
                        })
                    ];

                } else {
                    return state;
                }

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

        case types.LOAD_TRIPS_SUCCESS:
            let outMoment;
            let backMoment;
            if(action.trips) {
                return Object.keys(action.trips).map((el) => {

                    outMoment = moment.unix(action.trips[el].out);
                    const correction = outMoment.diff(backMoment, 'days') === 0 ? 1 : 0;

                    backMoment = moment.unix(action.trips[el].back);

                    const days = backMoment.diff(outMoment, 'days') === 0 ? 1 :
                        backMoment.diff(outMoment, 'days');

                    return {
                        id: el,
                        out: action.trips[el].out,
                        back: action.trips[el].back,
                        days: days,
                        counted: days - correction
                    };
                });
            } else {
                return state;
            }

        default:
            return state;
    }
}