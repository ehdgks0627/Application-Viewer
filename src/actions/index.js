import * as TYPES from './ActionTypes';
import axios from 'axios';
import { API_SERVER_URL } from '../config';

export function newAlert(alertData) {
  return {
    type: TYPES.NEW_ALERT,
    content: alertData.content,
    _id: alertData._id
  };
}

export function newAlertSocket(socket, content, _id) {
  return (dispatch) => {
    let alertData = {
      content: content,
      _id: _id
    };
    socket.emit('newAlert', alertData);
  };
}
