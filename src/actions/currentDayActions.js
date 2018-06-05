import * as types from './actionTypes';

export function updateCurrentDay(currentDay, trips) {
    return {type: types.UPDATE_CURRENT_DAY, data: {currentDay, trips}};
}