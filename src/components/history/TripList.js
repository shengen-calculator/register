import React from 'react';
import TripListRow from './TripListRow';

const TripList = ({trips, deleteTrip}) => {
    return (
        <table className="table">
            <tbody>
            {trips.map(trip =>
                <TripListRow key={trip.id} trip={trip} deleteTrip={deleteTrip} />
            )}
            </tbody>
        </table>
    );
};

export default TripList;
