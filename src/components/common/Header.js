import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import LogOut from '../common/LogOut';
import {withRouter} from 'react-router-dom';

import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <header className="App-header">
                <h1 className="App-title">Shengen Calculator</h1>
                <ul>
                    <li className="home-link"><NavLink exact to="/" activeClassName='selected'>
                        <i className="fas fa-home"/></NavLink>
                    </li>
                    <li className="history-link"><NavLink to="/history" activeClassName='selected'>
                        <i className="fas fa-list"/></NavLink>
                    </li>
                    <li className="about-link"><NavLink to="/about" activeClassName='selected'>
                        <i className="fas fa-info"/></NavLink>
                    </li>
                    <li className="help-link"><NavLink to="/help" activeClassName='selected'>
                        <i className="fas fa-question"/></NavLink>
                    </li>
                    {this.props.authentication.loggedIn&&
                    <li className="log-out"><LogOut/>
                    </li>}
                    {!this.props.authentication.loggedIn&&
                    <li className="help-link"><NavLink to="/logIn" activeClassName='selected'>
                        <i className="far fa-user"/></NavLink>
                    </li>}
                </ul>
            </header>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        authentication: state.authentication
    };
}

export default withRouter(connect(mapStateToProps)(Header));