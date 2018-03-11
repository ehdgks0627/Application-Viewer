import { combineReducers } from 'redux';

import alert from './alert';
import application from './application';
import item from './item';
import timer from './timer';

const reducers = combineReducers({
    alert, application, item, timer
});

export default reducers;
