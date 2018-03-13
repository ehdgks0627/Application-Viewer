import * as TYPES from './ActionTypes';

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

export function photoUploaded(photoData) {
    return {
        type: TYPES.PHOTO_UPLOADED,
        photo: photoData.photo,
        _id: photoData._id
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
