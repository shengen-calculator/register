import React from 'react';
import {NavLink} from 'react-router-dom';
import LogOut from '../common/LogOut';
import logo from '../../logo.svg';

import './Header.css';

const Header = () => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">
                Welcome to Shengen Register
            </h1>
            <ul>
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/history">History</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/help">Help</NavLink></li>
                <li><LogOut/></li>
            </ul>
        </header>

    );
};

export default Header;