import { combineReducers } from 'redux';

import alert from './alert';
import application from './application';
import applicationItem from './applicationItem';
import socket from './socket';

const reducers = combineReducers({
    alert, application, applicationItem, socket
});

export default reducers;
