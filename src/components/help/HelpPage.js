import React from 'react';
import './Help.css';

const HelpPage = () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 180);

    function formatDate(date) {
        const monthNames = [
            "січня", "лютого", "березня",
            "квітня", "травня", "червня", "липня",
            "серпня", "вересня", "жовтня",
            "листопада", "грудня"
        ];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return `${day} ${monthNames[monthIndex]} ${year}p.`;
    }

    return (
        <div className='help-page'>
            <h1>Довідка</h1>
            <p className="text">
                Червоне число зліва вказує на кількість днів перебування в країнах Шенгенської
                угоди за останні 180 днів (при подорожах за безвізом це число не повинно перевищувати
                90). Зелене число справа вказує на кількістів днів, що минуло з часу повернення після
                останньої подорожі. Ця інформація може бути цікава для людей що заїхали на територію
                України з європейським паспортом, щоб не перевищити дозволений час перебування.
            </p>
            <p className="text">
                Якщо Ви тільки почали користуватись сервісом, не забудьте перед початком роботи внести
                інформацію про всі Ваші минулі подорожі за останні 180 днів. Тобто починаючи з &nbsp;
                <b>{formatDate(startDate)}</b>
            </p>
            <br/>
            <p className="text">
                В випадку будь-яких незручностей Ви можете контактувати з нами за адресою
            </p>
            <p>
                <a href="mailto:info@shengen.me?subject=Users%20support">info@shengen.me</a>
            </p>
            <p>&nbsp;</p>
        </div>
    );
};

export default HelpPage;