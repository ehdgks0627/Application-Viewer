import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';

import Header from './Header';
import Main from './Main';
import Alert from './Alert';
import * as actions from '../actions';
import {SERVER_URL} from '../config';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        content: '',
        _id: ''
      };

      this.socket = io.connect(SERVER_URL);

      this.socket.on('newAlert', (alertData) => {
  		   this.props.newAlert(alertData);
  	   });

      this.makeAlert = this.makeAlert.bind(this);
    }

   componentWillUnmount() {
       this.socket.disconnect();
   }

    makeAlert(content, _id) {
      this.props.newAlertSocket(this.socket, content, _id);
    }

    render() {
        return(
            <div>
              <Header />
              <Main makeAlert={this.makeAlert} />
              {(this.props.content && this.props._id) ? <Alert content={this.props.content} _id={this.props._id} /> : <div></div> }
            </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
  return {
    content: state.alert.content,
    _id: state.alert._id
  };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
