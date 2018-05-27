import React from 'react';
import moment from 'moment';
import './SpentDays.css';

const SpentDays = ({trips}) => {
    let text = 0;

    if(trips.length > 0) {
        const today = moment();
        const lastTrip = trips.slice(-1)[0];
        if(lastTrip.back) {
            const lastBackTime = moment.unix(lastTrip.back);
            if(lastBackTime > today) {

            } else {

            }
        } else {
            const lastOutTime = moment.unix(lastTrip.out);
            if(lastOutTime > today) {

            } else {

            }
        }
    }

    return (
        <span className='spent-days'>{text}</span>
    );
};

export default SpentDays;