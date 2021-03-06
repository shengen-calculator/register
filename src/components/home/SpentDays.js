import React from 'react';
import './SpentDays.css';

const SpentDays = ({trips}) => {
    let sum = 0;
    if(trips.length > 0) {
        sum = trips.reduce(function (a, b) {
            return a + b['counted'];
        }, 0);
    }
    return (
        <span className='spent-days'>{sum}</span>
    );
};

export default SpentDays;