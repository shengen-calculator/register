import React from 'react';
import {Route, Switch} from 'react-router';
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/common/Header';
import About from './components/about/AboutPage';
import Help from './components/help/HelpPage';
import History from './components/history/HistoryPage';
import Home from './components/home/HomePage';
import * as authService from './services/authService';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import './App.css';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.logOut = this.logOut.bind(this);
    }
    logOut(event) {
        this.props.authServices.logOut();
    }


    render() {
        return (
            <div className="App">
                <Header logOut={this.logOut}/>
                <Switch>
                    <Route path='/about' activeClassName='selected' component={About}/>
                    <PrivateRoute path='/history' activeClassName='selected' component={History}/>
                    <Route path='/help' activeClassName='selected' component={Help}/>
                    <PrivateRoute path="/" activeClassName='selected' component={Home}/>
                </Switch>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authServices: bindActionCreators(authService, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
