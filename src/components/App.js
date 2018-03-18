import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import Header from './Header';
import Main from './Main';
import Alert from './Alert';
import * as actions from '../actions';
import { SERVER_URL, API_SERVER_URL } from '../config';

class App extends Component {
    constructor(props) {
        super(props);

        this.socket = io.connect(SERVER_URL);

        this.socket.on('newAlert', (alertData) => {
            if(!this.mainElement.applicationElement || (this.mainElement.applicationElement.props.match.params._id !== alertData._id)) {
                this.props.newAlert(alertData);
            }
        });
        this.socket.on('photoUploaded', (photoData) => {
            this.props.photoUploaded(photoData);
        });
        this.socket.on('startTimer', (timerData) => {
            this.props.startTimer(timerData);
        });
        this.socket.on('endTimer', (timerData) => {
            this.props.endTimer(timerData);
        });
        this.socket.on('newItem', (itemData) => {
            this.props.newItem(itemData);
        });
        this.socket.on('removeItem', (itemData) => {
            this.props.removeItem(itemData);
        });
        this.socket.on('editItem', (itemData) => {
            this.props.editItem(itemData);
        });
        this.socket.on('keyEvent', (keyData) => {
            this.props.keyEvent(keyData);
        });

        Array.prototype.equals = function (array) {
            // if the other array is a falsy value, return
            if (!array)
                return false;

            // compare lengths - can save a lot of time
            if (this.length != array.length)
                return false;

            for (var i = 0, l=this.length; i < l; i++) {
                // Check if we have nested arrays
                if (this[i] instanceof Array && array[i] instanceof Array) {
                    // recurse into the nested arrays
                    if (!this[i].equals(array[i]))
                        return false;
                }
                else if (this[i] != array[i]) {
                    // Warning - two different object instances will never be equal: {x:20} != {x:20}
                    return false;
                }
            }
            return true;
        };
        // Hide method from for-in loops
        Object.defineProperty(Array.prototype, "equals", {enumerable: false});

        this.startInterview = this.startInterview.bind(this);
        this.endInterview = this.endInterview.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.callback) {
            nextProps.callback(this.socket);
            return {};
        } else {
            return nextProps;
        }
    }


    componentWillUnmount() {
        this.socket.disconnect();
    }

    startInterview(content, _id) {
        let alertData = {
            content: content,
            _id: _id
        };
        this.props.socketFunction((socket) => {
            this.props.newAlertSocket(socket, alertData);
        });
        axios.get(API_SERVER_URL + '/application/start/' + _id)
            .then((response) => {
                let timerData = {
                    startTime: response.data.startTime,
                    _id: response.data._id
                };
                this.props.socketFunction((socket) => {
                    this.props.startTimerSocket(socket, timerData);
                });
            });
    }

    endInterview(_id) {
        axios.get(API_SERVER_URL + '/application/end/' + _id)
            .then((response) => {
                let timerData = {
                    endTime: response.data.endTime,
                    _id: response.data._id
                };
                this.props.socketFunction((socket) => {
                    this.props.endTimerSocket(socket, timerData);
                });
            });
    }

    render() {
        return(
            <div>
                <Header />
                <Main
                startInterview={this.startInterview}
                endInterview={this.endInterview}
                ref={(mainElement) => {this.mainElement = mainElement;}}
                />
                {(this.props.content && this.props._id) ? <Alert content={this.props.content} _id={this.props._id} /> : <div></div> }
            </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return { content: state.alert.content, _id: state.alert._id, callback: state.socket.callback };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
