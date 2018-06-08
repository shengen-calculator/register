import initialState from './initialState';
import * as types from '../actions/actionTypes';
import {tripHandle} from "../services/dataService";
import moment from 'moment';


export default function tripsReducer(state = initialState.trips, action) {
    switch (action.type) {

        case types.TRIP_ADD_SUCCESS:
            if (action.trip) {
                const oldTrip = state.filter(trip => trip.id === action.trip.id);
                if (oldTrip.length === 0) {
                    return [
                        ...state,
                        Object.assign({}, {
                            id: action.trip.id,
                            out: action.trip.out,
                            back: action.trip.back,
                            days: action.trip.days,
                            counted: action.trip.counted
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
                    Object.assign({}, {
                        id: action.trip.id,
                        out: action.trip.out,
                        back: action.trip.back,
                        days: action.trip.days,
                        counted: action.trip.counted
                    })
                ];
            } else {
                return state;
            }

        case types.DELETE_TRIP_SUCCESS:
            if (action.tripId) {
                return [
                    ...state.filter(trip => trip.id !== action.tripId)
                ];
            } else {
                return state;
            }

        case types.LOAD_TRIPS_SUCCESS:

            if(action.trips) {
                return action.trips.map((el) => {
                    return {
                        id: el.id,
                        out: el.out,
                        back: el.back,
                        days: el.days,
                        counted: el.counted
                    };
                });
            } else {
                return state;
            }

        case types.UPDATE_CURRENT_DAY:

            let backMoment;
            const trips = action.data.trips;

            if (trips) {
                return trips.map((trip) => {
                    const prevMoment = backMoment;
                    backMoment = moment.unix(trip.back);
                    return tripHandle(trip, trip.id, prevMoment, action.data.currentDay);
                });
            }

            return state;


        default:
            return state;
    }
}