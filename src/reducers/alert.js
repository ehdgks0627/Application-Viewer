import * as TYPES from '../actions/ActionTypes';

const initialState = {
    content: ''
};

export const ALERT_APPLICANT = "ALERT_APPLICANT";


export default function counter(state = initialState, action) {
    switch(action.type) {
      case TYPES.ALERT_APPLICANT:
        return { ...state, content: action.content };
      default:
        return state;
    }
}
