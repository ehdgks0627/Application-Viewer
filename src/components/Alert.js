import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  content: PropTypes.string
};

const defaultProps = {
  content: ''
};

class Alert extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
          <div className="alert">
            <strong>Danger!</strong> 김동한
          </div>
        );
    }
}
Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
