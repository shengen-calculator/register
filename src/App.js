import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import Header from './components/common/Header';
import About from './components/about/AboutPage';
import Help from './components/help/HelpPage';
import History from './components/history/HistoryPage';
import Home from './components/home/HomePage';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path='/about' component={About}/>
                    <Route path='/history' component={History}/>
                    <Route path='/help' component={Help}/>
                </Switch>
            </div>
        );
    }
}

export default App;
