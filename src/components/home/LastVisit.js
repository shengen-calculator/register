import React from 'react';
import moment from 'moment';
import './LastVisit.css';

const LastVisit = ({trips}) => {
    let text = '--';
    if(trips.length > 0) {
        const lastTrip = trips.slice(-1)[0];
        if(lastTrip.back) {
            const today = moment();
            const days = today.diff(moment.unix(lastTrip.back), 'days');
            if(days >= 0) {
                text = days + 1;
            }
        }
    }
    return (
        <span className='last-visit'>{text}</span>
    );
};

export default LastVisit;