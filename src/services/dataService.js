import tripApi from '../api/fireBaseTripApi';
import {ajaxCallError, beginAjaxCall} from "../actions/ajaxStatusActions";
import {updateCurrentDay} from "../actions/currentDayActions";
import {
    addTripSuccess, updateTripSuccess, tripOutSuccess,
    tripBackSuccess, loadTripsSuccess
} from "../actions/tripActions";
import moment from 'moment';
import lastDaysCount from './lastDaysCount';


export function tripHandle(trip, id, backMoment, currentDay) {

    let days = 0;
    let outMoment = moment.unix(trip.out);
    let correction = 0;
    let currentMoment = moment.unix(currentDay);

    if (backMoment) {
        correction = outMoment.diff(backMoment, 'days') === 0 ? 1 : 0;
    }

    const todayDiff = currentMoment.diff(outMoment, 'days');

    if (trip.back) {
        backMoment = moment.unix(trip.back);
        const backDiff = currentMoment.diff(backMoment, 'days');

        days = backMoment.diff(outMoment, 'days') + 1;

        if(backDiff >= lastDaysCount) {
            correction = days;
        } else {
            if(todayDiff >= lastDaysCount) {
                correction = todayDiff - lastDaysCount + 1;
            }
        }

    } else {
        days = todayDiff >= 0 ? todayDiff + 1 : 1;
        if(days > lastDaysCount) {
            correction = todayDiff - lastDaysCount + 1;
        }
    }

    return {
        id: id,
        out: trip.out,
        back: trip.back,
        days: days,
        counted: days - correction
    };
}

export function out(uid, dateTime) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return tripApi.out(uid, dateTime).then(() => {
            dispatch(tripOutSuccess())
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function back(uid, dateTime, tripId) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return tripApi.back(uid, dateTime, tripId).then(() => {
            dispatch(tripBackSuccess());
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });

    };
}

export function getTrips(uid) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        const current = getState().currentDay;

        return tripApi.loadTrips(uid).then((x) => {
            let backMoment;
            const trips = x.val();

            if (trips) {
                const result = Object.keys(trips).map((el) => {
                    const prevMoment = backMoment;
                    backMoment = moment.unix(trips[el].back);
                    return tripHandle(trips[el], el, prevMoment, current);
                });
                dispatch(loadTripsSuccess(result));
                return result;
            }
            dispatch(loadTripsSuccess());

        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function deleteLastTrip(tripId) {
    return function (dispatch, getState) {

    };
}

export function updateCurrent(currentDay) {
    return function (dispatch, getState) {
        dispatch(updateCurrentDay(currentDay, getState().trips));
    };
}

export function startListenDataChanges(uid, errorHandler) {
    return function (dispatch, getState) {
        let current = getState().currentDay;

        tripApi.subscribeTripsAdded(uid, function (snapshot) {
            dispatch(beginAjaxCall());

            const trip = snapshot.val();

            let prevBackMoment;

            if (getState().trips.length > 0) {
                prevBackMoment = moment.unix(getState().trips.slice(-1)[0].back);
            }

            if(current < trip.out) {
                dispatch(updateCurrent(trip.out));
            }

            const handledTrip = tripHandle(
                {
                    out: trip.out
                }, snapshot.key, prevBackMoment, current);

            dispatch(addTripSuccess(handledTrip));

        }, function (error) {
            dispatch(ajaxCallError(error));
            errorHandler(error);
        });

        tripApi.subscribeTripsChanged(uid, function (snapshot) {
            dispatch(beginAjaxCall());
            const trip = snapshot.val();
            let prevBackMoment;

            if (getState().trips.length > 1) {
                prevBackMoment = moment.unix(getState().trips.slice(-2)[0].back);
            }

            if(current < trip.back) {
                dispatch(updateCurrent(trip.back));
            }

            const handledTrip = tripHandle(
                {
                    out: trip.out,
                    back: trip.back
                }, snapshot.key, prevBackMoment, current);

            dispatch(updateTripSuccess(handledTrip));

        }, function (error) {
            dispatch(ajaxCallError(error));
            errorHandler(error);
        });

    };
}