import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  content: PropTypes.string,
  _id: PropTypes.string
};

const defaultProps = {
  content: '',
  _id: ''
};

class Alert extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        window.location = '/application/' + this.props._id;
    }

    render() {
        return(
          <div className="alert" onClick={this.onClick}>
            <strong>현재 면접자</strong> {this.props.content}
          </div>
        );
    }
}
Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
