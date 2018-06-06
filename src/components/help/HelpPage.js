import React from 'react';
import './Help.css';

const HelpPage = () => {
    return (
        <div className='help-page'>
            <h1>Help Page</h1>
            <p>
                В випадку будь-яких незручностей Ви можете контактувати з нами за адресою
            </p>
            <p>
                <a href="mailto:info@shengen.eu?subject=Users%20support">info@shengen.eu</a>
            </p>
        </div>
    );
};

export default HelpPage;