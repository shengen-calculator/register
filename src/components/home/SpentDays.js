import React from 'react';
import './SpentDays.css';

const SpentDays = ({trips}) => {

    const sum = trips.reduce(function(a,b) {
        return a + b['counted'];
    }, 0);

    return (
        <span className='spent-days'>{sum}</span>
    );
};

export default SpentDays;