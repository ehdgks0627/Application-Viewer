import * as TYPES from '../actions/ActionTypes';

export default function alert(state = {}, action) {
    switch(action.type) {
        case TYPES.NEW_ALERT:
            return { content: action.content, _id: action._id };
        default:
            return state;
    }
}
