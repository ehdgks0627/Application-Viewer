import React, { Component } from 'react';
import PropTypes from 'prop-types';

function createWarning(functionName) {
  return () => {console.log(functionName + " is not defined");};
}

const propTypes = {
  onPlus: PropTypes.func,
  onSubtract: PropTypes.func,
  onRandomizeColor: PropTypes.func,
};

const defaultProps = {
  onPlus: () => {createWarning("onPlus");},
  onSubtract: () => {createWarning("onSubtract");},
  onRandomizeColor: () => {createWarning("onRandomizeColor");},
};

class Control extends Component {

    render() {
        return(
            <div>
              <button onClick={this.props.onPlus}>+</button>
              <button onClick={this.props.onSubtract}>-</button>
              <button onClick={this.props.onRandomizeColor}>Randomize Color</button>
            </div>
        );
    }
}
Control.propTypes = propTypes;
Control.defaultProps = defaultProps;

export default Control;
