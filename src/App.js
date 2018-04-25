import React from 'react';
import {Route, Switch} from 'react-router';
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/common/Header';
import About from './components/about/AboutPage';
import Help from './components/help/HelpPage';
import History from './components/history/HistoryPage';
import Home from './components/home/HomePage';


import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
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

export default App;
