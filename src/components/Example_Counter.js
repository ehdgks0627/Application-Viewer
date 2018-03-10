import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

import Value from './Value';
import Control from './Control';

class Counter extends Component {

    constructor(props) {
        super(props);
        this.setRandomColor = this.setRandomColor.bind(this);
    }

    setRandomColor() {
        const color = [
            Math.floor((Math.random()*55) + 200),
            Math.floor((Math.random()*55) + 200),
            Math.floor((Math.random()*55) + 200)
        ];
        this.props.setColor(color);
    }

    render() {
        const color = this.props.color;
        const style = {
          background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        };
        return(
            <div style={style}>
              <Value number={this.props.number} />
              <Control
               onPlus={this.props.incrementNumber}
               onSubtract={this.props.decrementNumber}
               onRandomizeColor={this.setRandomColor}
              />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    number: state.counter.number,
    color: state.ui.color
  };
}

const mapDispatchToProps = (dispath) => {
    return bindActionCreators(actions, dispath);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
