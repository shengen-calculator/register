import initialState from './initialState';
import * as types from '../actions/actionTypes';


export default function currentDayReducer(state = initialState.currentDay, action) {
    switch (action.type) {

        case types.UPDATE_CURRENT_DAY:
            return action.data.currentDay > 0 ? action.data.currentDay : state;

        default:
            return state;
    }
}