import React from 'react';
import moment from 'moment';

const TripListRow = ({trip, deleteTrip}) => {
    return (
        <tr className="double">
            <td colSpan="3">
                <table>
                    <tbody>
                        <tr>
                            <td className="out">{moment.unix(trip.out).format('ll')}</td>
                            <td className="days" rowSpan="2">{trip.days}&nbsp;&nbsp;({trip.counted})</td>
                            <td className="action" rowSpan="2">
                                <div id={trip.id} onClick={deleteTrip} className="delete"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="back">{trip.back > 0 ? moment.unix(trip.back).format('ll') : ''}</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    );
};

export default TripListRow;