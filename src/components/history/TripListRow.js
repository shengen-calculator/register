import React from 'react';
import moment from 'moment';

const TripListRow = ({trip}) => {
    return (
        <tr>
            <td>{moment.unix(trip.out).format('ll')}</td>
            <td>{trip.back > 0 ? moment.unix(trip.back).format('ll') : ''}</td>
            <td>{trip.days}</td>
            <td>{trip.counted}</td>
        </tr>
    );
};

export default TripListRow;