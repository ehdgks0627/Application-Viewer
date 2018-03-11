import * as TYPES from '../actions/ActionTypes';

const initialState = {

};

export const UPLOAD_PHOTO = "UPLOAD_PHOTO";


export default function counter(state = initialState, action) {
    switch(action.type) {
      case TYPES.UPLOAD_PHOTO:
        return { ...state, photo: action.photo };
      default:
        return state;
    }
}
