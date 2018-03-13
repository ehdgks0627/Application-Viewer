import * as TYPES from '../actions/ActionTypes';

const initialState = {
    content: 0
};

export const INSERT_STRING = "INSERT_STRING";
export const DELETE_STRING = "DELETE_STRING";


export default function counter(state = initialState, action) {
    switch(action.type) {
      case TYPES.INSERT_STRING:
        return { ...state, content: state.content };
      case TYPES.DELETE_STRING:
        return { ...state, content: state.content };
      default:
        return state;
    }
}
