import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  isEditable: PropTypes.bool
};

const defaultProps = {
  title: '',
  content: '',
  isEditable: false
};

class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
          title: props.title,
          content: props.content
        }
    }

    render() {
        return(
            <li className="list-group-item">
             <h4>{this.state.title}</h4>
             <br />
             {this.state.content}
            </li>
        );
    }
}
Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

export default Item;
