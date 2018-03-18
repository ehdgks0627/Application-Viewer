import * as TYPES from './ActionTypes';

export function photoUploaded(photoData) {
    return {
        type: TYPES.PHOTO_UPLOADED,
        photo: photoData.photo,
        _id: photoData._id
    };
}

export function newAlert(alertData) {
    return {
        type: TYPES.NEW_ALERT,
        content: alertData.content,
        _id: alertData._id
    };
}

export function newAlertSocket(socket, alertData) {
    return (dispatch) => {
        socket.emit('newAlert', alertData);
    };
}

export function startTimer(timerData) {
    return {
        type: TYPES.START_TIMER,
        startTime: timerData.startTime,
        _id: timerData._id
    };
}

export function startTimerSocket(socket, timerData) {
    return (dispatch) => {
        socket.emit('startTimer', timerData);
    };
}

export function endTimer(timerData) {
    return {
        type: TYPES.END_TIMER,
        endTime: timerData.endTime,
        _id: timerData._id
    };
}

export function endTimerSocket(socket, timerData) {
    return (dispatch) => {
        socket.emit('endTimer', timerData);
    };
}

export function newItem(itemData) {
    return {
        type: TYPES.NEW_ITEM,
        _id: itemData._id,
        key: itemData.key,
        title: itemData.title,
        content: itemData.content
    };
}

export function newItemSocket(socket, itemData) {
    return (dispatch) => {
        socket.emit('newItem', itemData);
    };
}

export function removeItem(itemData) {
    return {
        type: TYPES.REMOVE_ITEM,
        _id: itemData._id,
        key: itemData.key,
        title: itemData.title
    };
}

export function removeItemSocket(socket, itemData) {
    return (dispatch) => {
        socket.emit('removeItem', itemData);
    };
}

export function editItem(itemData) {
    return {
        type: TYPES.EDIT_ITEM,
        _id: itemData._id,
        key: itemData.key,
        title: itemData.title,
        content: itemData.content
    };
}

export function editItemSocket(socket, itemData) {
    return (dispatch) => {
        socket.emit('editItem', itemData);
    };
}


export function keyEvent(keyData) {
    return {
        type: TYPES.KEY_EVENT,
        _id: keyData._id,
        title: keyData.title,
        content: keyData.content,
    };
}

export function keyEventSocket(socket, keyData) {
    return (dispatch) => {
        socket.emit('keyEvent', keyData);
    };
}

export function socketFunction(callback) {
    return {
        type: TYPES.SOCKET_FUNCTION,
        callback: callback
    };
}
