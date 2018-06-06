import React from 'react';
import TripListRow from './TripListRow';

const TripList = ({trips}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th className="out">Виїзд</th>
                <th className="back">Повернення</th>
                <th className="days">К-сть</th>
                <th className="account">Зарах.</th>
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
