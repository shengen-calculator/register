import tripApi from '../api/fireBaseTripApi';
import {ajaxCallError, beginAjaxCall} from "../actions/ajaxStatusActions";
import {
    addTripSuccess, updateTripSuccess, tripOutSuccess, tripBackSuccess
} from "../actions/tripActions";


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
            dispatch(tripBackSuccess())
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });

    };
}

export function getTrips(uid) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return tripApi.loadTrips(uid).then(() => {



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

export function startListenDataChanges(uid, errorHandler) {
    return function (dispatch, getState) {
        tripApi.subscribeTripsAdded(uid, function (snapshot) {
            dispatch(beginAjaxCall());
            const trip = snapshot.val();
            dispatch(addTripSuccess({
                    id: snapshot.key,
                    out: trip.out,
                    back: trip.back
                }
            ));
        }, function (error) {
            dispatch(ajaxCallError(error));
            errorHandler(error);
        });

        tripApi.subscribeTripsChanged(uid, function (snapshot) {
            dispatch(beginAjaxCall());
            const trip = snapshot.val();
            dispatch(updateTripSuccess({
                    id: snapshot.key,
                    out: trip.out,
                    back: trip.back
                }
            ));
        }, function (error) {
            dispatch(ajaxCallError(error));
            errorHandler(error);
        });

    };
}