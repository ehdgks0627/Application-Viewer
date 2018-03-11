import * as TYPES from '../actions/ActionTypes';

const initialState = {
    isRunning: false,
    startTime: 0
};

export const START_TIMER = "START_TIMER";
export const END_TIMER = "END_TIMER";


export default function counter(state = initialState, action) {
    switch(action.type) {
      case TYPES.START_TIMER:
        return { ...state, startTime: action.startTime, isRunning: true };
      case TYPES.END_TIMER:
        return { ...state, isRunning: false };
      default:
        return state;
    }
}
