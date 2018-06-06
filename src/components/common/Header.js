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
                <li className="home-link"><NavLink exact to="/">Головна</NavLink></li>
                <li className="history-link"><NavLink to="/history">Історія</NavLink></li>
                <li className="about-link"><NavLink to="/about">Про Нас</NavLink></li>
                <li className="help-link"><NavLink to="/help">Довідка</NavLink></li>
                <li><LogOut/></li>
            </ul>
        </header>

    );
};

export default Header;