import React from 'react';
import './Help.css';

const HelpPage = () => {
    return (
        <div className='help-page'>
            <h1>Довідка</h1>
            <p className="text">
                Червоне число зліва вказує на кількість днів перебування в країнах Шенгенської
                угоди за останні 180 днів (при подорожах за безвізом це число не повинно перевищувати
                90). Зелене число справа вказує на кількістів днів, що минуло з часу повернення після
                останньої подорожі.
            </p>
            <p className="text">
                В випадку будь-яких незручностей Ви можете контактувати з нами за адресою
            </p>
            <p>
                <a href="mailto:info@shengen.eu?subject=Users%20support">info@shengen.eu</a>
            </p>
            <p>&nbsp;</p>
        </div>
    );
};

export default HelpPage;