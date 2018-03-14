import * as TYPES from '../actions/ActionTypes';

export default function counter(state = {}, action) {
    switch(action.type) {
        case TYPES.INSERT_STRING:
            return { ...state };
        case TYPES.DELETE_STRING:
            return { ...state };
        default:
            return state;
    }
}
