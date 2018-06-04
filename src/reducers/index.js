import {combineReducers} from 'redux';
import authentication from './authenticationReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import currentDay from './currentDayReducer';
import trips from './tripsReducer';
import {routerReducer} from 'react-router-redux';


const rootReducer = combineReducers({
    router: routerReducer,
    ajaxCallsInProgress,
    trips,
    authentication,
    currentDay
});

export default rootReducer;