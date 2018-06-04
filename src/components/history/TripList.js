import React from 'react';
import TripListRow from './TripListRow';

const TripList = ({trips}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>За бугор</th>
                <th>Дому</th>
                <th>Враховується</th>
                <th>Всього</th>
            </tr>
            </thead>
            <tbody>
            {trips.map(trip =>
                <TripListRow key={trip.id} trip={trip} />
            )}
            </tbody>
        </table>
    );
};


export default TripList;
