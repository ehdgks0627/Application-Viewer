import * as TYPES from '../actions/ActionTypes';

export default function socket(state = {}, action) {
    switch(action.type) {
        case TYPES.SOCKET_FUNCTION:
            return { ...state, callback: action.callback };
        default:
            return state;
    }
}
