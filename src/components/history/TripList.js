import React from 'react';
import TripListRow from './TripListRow';

const TripList = ({trips}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th className="out">За бугор</th>
                <th className="back">Дому</th>
                <th className="days">Всього</th>
                <th className="account">Зараховано</th>
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
