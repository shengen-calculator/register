import tripApi from '../api/fireBaseTripApi';
import {ajaxCallError, beginAjaxCall} from "../actions/ajaxStatusActions";
import {
    addTripSuccess, updateTripSuccess
} from "../actions/tripActions";


export function out(uid, dateTime) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return tripApi.out(uid, dateTime).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function back(uid, dateTime, tripId) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return tripApi.back(uid, dateTime, tripId).catch(error => {
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
        let loaded = false;
        tripApi.subscribeTripsAdded(uid, function (snapshot) {
            dispatch(beginAjaxCall());

            dispatch(addTripSuccess({
                    item: snapshot.val(),
                    key: snapshot.key,
                    a: loaded
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
            }));
        }, function (error) {
            dispatch(ajaxCallError(error));
            errorHandler(error);
        });

    };
}