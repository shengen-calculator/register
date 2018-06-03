import { database } from './database';

class TripApi {


    static out(uid, dateTime) {
        return database.ref('trips/' + uid).push({out: dateTime});
    }

    static back(uid, dateTime, tripId) {
        return database.ref('trips/' + uid + '/' + tripId).update({back: dateTime});
    }

    static loadTrips(uid) {
        return database.ref('trips/' + uid).once('value');
    }


    static subscribeTripsAdded(uid, handler, errorHandler) {
        return database.ref('trips/' + uid).on('child_added', function (snapshot) {
            handler(snapshot, uid);
        }, function (error) {
            errorHandler(error);
        })
    }

    static subscribeTripsChanged(uid, handler, errorHandler) {
        return database.ref('trips/' + uid).on('child_changed', function (snapshot) {
            handler(snapshot, uid);
        }, function (error) {
            errorHandler(error);
        })
    }

    static unSubscribeTripsChanges(uid) {
        return database.ref('trips/' + uid).off();
    }

}

export default TripApi;