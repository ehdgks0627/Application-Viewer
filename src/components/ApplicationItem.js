import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import update from 'immutability-helper';

import ApplicationItemAdd from './ApplicationItemAdd';
import ApplicationItemDetail from './ApplicationItemDetail';
import * as TYPES from '../actions/ActionTypes';

const propTypes = {
    _id: PropTypes.string.isrequired,
    contents: PropTypes.array
};

const defaultProps = {
    _id: '',
    contents: []
};

class ApplicationItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contents: this.props.contents
        };
    }

    componentWillReceiveProps(nextProps) {

        if(!this.state.contents.equals(nextProps.contents)) {
            this.setState({contents: nextProps.contents});
        }
        if(nextProps.item_id === this.props._id && nextProps.item_title === this.props.title)
        {
            let index;
            switch(nextProps.type) {
                case TYPES.NEW_ITEM:
                    this.setState({
                        contents: update(this.state.contents, {$push: [{key: nextProps.item_key, content: nextProps.item_content}]})
                    });
                    break;
                case TYPES.REMOVE_ITEM:
                    index = this.state.contents.findIndex((e) => {return e.key == nextProps.item_key});
                    if(index != -1) {
                        this.setState({
                            contents: update(this.state.contents, {$splice: [[index, 1]]}),
                        });
                    }
                    break;
                case TYPES.EDIT_ITEM:
                    index = this.state.contents.findIndex((e) => {return e.key == nextProps.item_key});
                    if(index != -1) {
                        this.setState({
                            contents: update(this.state.contents, {[index]: {content: {$set: nextProps.item_content}}})
                        });
                    }
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        const mapToComponents = (data) => {
            data.sort(function(a, b) {
                return a.key - b.key;
            });
            let items = data.map((item) => {
                return (<ApplicationItemDetail index={item.key} _id={this.props._id} title={this.props.title} content={item.content} />);
            });
            return <ul className="list-group">{items}</ul>;
        };
        return(
            <li className="list-group-item">
               <h4>{this.props.title}</h4>
               <br />
               {mapToComponents(this.state.contents)}
               <ApplicationItemAdd title={this.props.title} _id={this.props._id} />
            </li>
        );
    }
}

ApplicationItem.propTypes = propTypes;
ApplicationItem.defaultProps = defaultProps;

const mapStateToProps = (state = {}) => {
    return {
        type: state.applicationItem.type,
        item_id: state.applicationItem._id,
        item_key: state.applicationItem.key,
        item_title: state.applicationItem.title,
        item_content: state.applicationItem.content
      };
};

export default connect(mapStateToProps)(ApplicationItem);
