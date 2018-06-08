import React from 'react';
import {NavLink} from 'react-router-dom';
import LogOut from '../common/LogOut';

import './Header.css';

const Header = () => {
    return (
        <header className="App-header">
            <h1 className="App-title">
                Shengen Calculator
            </h1>
            <ul>
                <li className="home-link"><NavLink exact to="/"><i className="fas fa-home"/></NavLink></li>
                <li className="history-link"><NavLink to="/history"><i className="fas fa-list"/></NavLink></li>
                <li className="about-link"><NavLink to="/about"><i className="fas fa-info"/></NavLink></li>
                <li className="help-link"><NavLink to="/help"><i className="fas fa-question"/></NavLink></li>
                <li><LogOut/></li>
            </ul>
        </header>

    );
};

export default Header;