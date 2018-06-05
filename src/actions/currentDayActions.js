import * as types from './actionTypes';

export function updateCurrentDay(currentDay) {
    return {type: types.UPDATE_CURRENT_DAY, currentDay};
}