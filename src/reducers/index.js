import {combineReducers} from 'redux';
import authentication from './authenticationReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {routerReducer} from 'react-router-redux';


const rootReducer = combineReducers({
    router: routerReducer,
    ajaxCallsInProgress,
    authentication
});

export default rootReducer;