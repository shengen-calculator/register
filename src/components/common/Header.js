import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../logo.svg';

import './Header.css';

const Header = () => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/help">Help</Link></li>
            </ul>
        </header>

    );
};

export default Header;