import { combineReducers } from 'redux';

import alert from './alert';
import application from './application';
import item from './item';

const reducers = combineReducers({
    alert, application, item
});

export default reducers;
