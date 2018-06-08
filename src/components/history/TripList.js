import React from 'react';
import TripListRow from './TripListRow';

const TripList = ({trips, deleteTrip}) => {
    const tripExists = trips.length > 0;
    let i = 0;
    return (
        <table className="table">
            {tripExists && <tbody>
            {trips.map(trip => {
                    i++;
                    return <TripListRow
                        key={trip.id}
                        trip={trip}
                        deleteTrip={deleteTrip}
                        isFirst={i === 1}/>
                }
            )}
            </tbody>}
            {!tripExists && <tbody>
            <tr>
                <td>Інформація про подорожі відсутня</td>
            </tr>
            </tbody>}
        </table>
    );
};

export default TripList;
