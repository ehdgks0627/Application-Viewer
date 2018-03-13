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

        this.startInterview = this.startInterview.bind(this);
        this.endInterview = this.endInterview.bind(this);
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    startInterview(content, _id) {
        let alertData = {
            content: content,
            _id: _id
        };
        this.props.newAlertSocket(this.socket, alertData);
        axios.get(API_SERVER_URL + '/application/start/' + _id)
        .then((response) => {
              let timerData = {
                  startTime: response.data.startTime,
                  _id: response.data._id
              };
              this.props.startTimerSocket(this.socket, timerData); //emit이 안댐
        });
    }

    endInterview(_id) {
      axios.get(API_SERVER_URL + '/application/end/' + _id)
      .then((response) => {
            let timerData = {
                endTime: response.data.endTime,
                _id: response.data._id
            };
            this.props.endTimerSocket(this.socket, timerData); //emit이 안댐
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
    return { content: state.alert.content, _id: state.alert._id };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
