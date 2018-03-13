import * as TYPES from '../actions/ActionTypes';

const initialState = {
    content: '',
    _id: ''
};

export default function alert(state = initialState, action) {
    switch(action.type) {
      case TYPES.NEW_ALERT:
        return { content: action.content, _id: action._id };
      default:
        return state;
    }
}
