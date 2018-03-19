import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import * as TYPES from '../actions/ActionTypes';

const propTypes = {
    _id: PropTypes.string.isrequired,
    content: PropTypes.string
};

const defaultProps = {
    _id: '',
    content: ''
};

class ApplicationItemRealTimeKey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let keyData = {
            _id: this.props._id,
            title: this.props.title,
            content: e.target.value
        };
        this.props.socketFunction((socket) => {
            this.props.keyEventSocket(socket, keyData);
        });
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.content !== nextProps.content && !nextProps.type) {
            this.setState({content: nextProps.content});
        } else if(this.props._id === nextProps.item_id &&
                  this.props.title === nextProps.item_title &&
                  this.state.content !== nextProps.item_content) {
            this.setState({content: nextProps.item_content});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.textarea.value !== this.state.content) {
            this.textarea.value = this.state.content;
        }
    }

    render() {
        return(
            <li className="list-group-item">
               <h4>{this.props.title}</h4>
               <br />
               <textarea
               name="content"
               className="form-control"
               onChange={this.onChange}
               style={{'width': '100%'}}
               rows="50"
               ref={(textarea) => {this.textarea = textarea;}}
               >{this.state.content}</textarea>
            </li>
        );
    }
}

ApplicationItemRealTimeKey.propTypes = propTypes;
ApplicationItemRealTimeKey.defaultProps = defaultProps;

const mapStateToProps = (state = {}) => {
    return {
        type: state.applicationItem.type,
        item_id: state.applicationItem._id,
        item_title: state.applicationItem.title,
        item_content: state.applicationItem.content
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationItemRealTimeKey);
