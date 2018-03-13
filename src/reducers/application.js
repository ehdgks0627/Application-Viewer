import * as TYPES from '../actions/ActionTypes';

export default function counter(state = {}, action) {
    switch(action.type) {
      case TYPES.PHOTO_UPLOADED:
        return { ...state, photo: action.photo, _id: action._id };
      default:
        return state;
    }
}
