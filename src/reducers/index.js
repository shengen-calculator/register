import {combineReducers} from 'redux';
import authentication from './authenticationReducer';
import {routerReducer} from 'react-router-redux';


const rootReducer = combineReducers({
    router: routerReducer,
    authentication
});

export default rootReducer;