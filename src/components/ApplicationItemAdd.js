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
            this.textarea.focus();
        }
    }

    onChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    onKeyPress(e) {
        if(e.charCode == 13 && !e.shiftKey && !e.ctrlKey) { // pressed enter
            e.preventDefault();
            this.addItem();
        }
    }

    render() {
        return(
            <div>
              <textarea
              name="content"
              className="form-control"
              value={this.state.content}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
              style={{'width': '100%'}}
              row="5"
              ref={(textarea) => {this.textarea = textarea;}}
              >{this.state.content}</textarea>
              <button className="btn-primary mt-1" onClick={this.addItem} style={{'float': 'right'}}>추가</button>
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
