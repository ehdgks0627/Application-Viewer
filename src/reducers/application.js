import * as TYPES from '../actions/ActionTypes';

export default function application(state = {}, action) {
    switch(action.type) {
      case TYPES.PHOTO_UPLOADED:
        return { ...state, photo: action.photo, _id: action._id };
      case TYPES.START_TIMER:
        return { ...state, startTime: action.startTime, _id: action._id };
      case TYPES.END_TIMER:
        return { ...state, endTime: action.endTime, _id: action._id };
      default:
        return state;
    }
}
