import * as TYPES from '../actions/ActionTypes';

export default function applicationItem(state = {}, action) {
    switch(action.type) {
        case TYPES.NEW_ITEM:
            return { ...state, _id: action._id, type: TYPES.NEW_ITEM, key: action.key, title: action.title, content: action.content };
        case TYPES.REMOVE_ITEM:
            return { ...state, _id: action._id, type: TYPES.REMOVE_ITEM, key: action.key, title: action.title };
        case TYPES.EDIT_ITEM:
            return { ...state, _id: action._id, type: TYPES.EDIT_ITEM, key: action.key, title: action.title, content: action.content };
        case TYPES.KEY_EVENT:
            return { ...state, _id: action._id, type: TYPES.KEY_EVENT, title: action.title, content: action.content };
        default:
            return state;
    }
}
