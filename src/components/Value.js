import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  number: PropTypes.number
};

const defaultProps = {
  number: -1
};

class Value extends Component {

    render() {
        return(
            <h1>{this.props.number}</h1>
        );
    }
}
Value.propTypes = propTypes;
Value.defaultProps = defaultProps;

export default Value;
