import React from 'react';

const RegistrationLink = ({login, text}) => {

    return (
        <a href='#login' onClick={login}>{text}</a>
    );
};

export default RegistrationLink;
