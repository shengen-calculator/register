import {combineReducers} from 'redux';
import authentication from './authenticationReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import trips from './tripsReducer';
import {routerReducer} from 'react-router-redux';


const rootReducer = combineReducers({
    router: routerReducer,
    ajaxCallsInProgress,
    trips,
    authentication
});

export default rootReducer;