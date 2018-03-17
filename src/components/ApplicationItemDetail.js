import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';

const propTypes = {
    _id: PropTypes.string.isrequired,
    index: PropTypes.number.isrequired,
    title: PropTypes.string.isrequired,
    content: PropTypes.string
};

const defaultProps = {
    _id: '',
    index: -1,
    title: '',
    content: '',
};

class ApplicationItemDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
            isEditing: false
        };

        this.onBeginEdit = this.onBeginEdit.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onCancelEdit = this.onCancelEdit.bind(this);
    }

    onBeginEdit() {
        this.setState({isEditing: true});
    }

    onRemove() {
        let itemData = {
            _id: this.props._id,
            key: this.props.index,
            title: this.props.title,
        };
        this.props.socketFunction((socket) => {
            this.props.removeItemSocket(socket, itemData);
        });
    }

    onEdit() {
        this.setState({isEditing: false});
        let itemData = {
            _id: this.props._id,
            key: this.props.index,
            title: this.props.title,
            content: this.editTextarea.value
        };
        this.props.socketFunction((socket) => {
            this.props.editItemSocket(socket, itemData);
        });
    }

    onCancelEdit() {
        this.setState({isEditing: false});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.content !== this.state.content) {
            this.setState({content: nextProps.content});
        }
    }

    render() {
        let divItem = (<div style={{'word-wrap': 'break-word'}}>{this.state.content}</div>);
        let textareaItem = (
            <div>
                <textarea
                style={{'width': '100%'}}
                className="form-control"
                rows="5"
                ref={(editTextarea) => {this.editTextarea = editTextarea;}}>{this.state.content}
                </textarea>
            </div>);
        return (
            <li className="list-group-item">
                {this.state.isEditing ? textareaItem : divItem}
                <div style={{'float': 'right'}}>
                    {this.state.isEditing ?
                    <div>
                        <i className="material-icons" onClick={this.onEdit}>done</i>
                        <i className="material-icons" onClick={this.onCancelEdit} style={{'margin-left': '0.5em'}}>cancel</i>
                    </div>
                    :
                    <div>
                        <i className="material-icons" onClick={this.onBeginEdit}>border_color</i>
                        <i className="material-icons" onClick={this.onRemove} style={{'margin-left': '0.5em'}}>cancel</i>
                    </div>
                    }
                </div>
            </li>);
    }
}

ApplicationItemDetail.propTypes = propTypes;
ApplicationItemDetail.defaultProps = defaultProps;

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
}

export default connect(null, mapDispatchToProps)(ApplicationItemDetail);
