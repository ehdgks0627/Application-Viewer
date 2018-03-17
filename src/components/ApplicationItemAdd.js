import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';

const propTypes = {
    _id: PropTypes.string.isrequired,
    title: PropTypes.string.isrequired
};

const defaultProps = {
    _id: '',
    title: ''
};


class ApplicationItemEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };

        this.addItem = this.addItem.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    addItem() {
        if(this.state.content.length > 0) {
            let itemData = {
                _id: this.props._id,
                title: this.props.title,
                content: this.state.content,
            };
            this.props.socketFunction((socket) => {
                this.props.newItemSocket(socket, itemData);
            });
            this.setState({content: ''});
            this.input.focus();
        }
    }

    onChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    onKeyPress(e) {
        if(e.charCode == 13) { // pressed enter
            this.addItem();
        }
    }

    render() {
        return(
            <div>
              <input
              text="text"
              name="content"
              value={this.state.content}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
              ref={(input) => {this.input = input;}}
              style={{'float': 'left'}}
              />
              <button className="btn-primary" onClick={this.addItem} style={{'float': 'right'}}>추가</button>
            </div>
        );
    }
}
ApplicationItemEdit.propTypes = propTypes;
ApplicationItemEdit.defaultProps = defaultProps;

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
}

export default connect(null, mapDispatchToProps)(ApplicationItemEdit);
