import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    caption: PropTypes.string,
    startTime: PropTypes.number,
    endTime: PropTypes.number
};

const defaultProps = {
    caption: null,
    startTime: null,
    endTime: null
};

class StopWatch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: null,
            intervalId: null
        };

        this.updateTimeGap = this.updateTimeGap.bind(this);
    }

    componentDidMount() {
        var intervalId = setInterval(this.updateTimeGap, 100);
        // store intervalId in the state so it can be accessed later:
        this.setState({intervalId: intervalId});
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    updateTimeGap() {
        let timeGap;
        if(this.props.startTime && this.props.endTime) {
            timeGap = this.props.endTime - this.props.startTime;
        } else if(this.props.startTime) {
            timeGap = new Date() - this.props.startTime;
        } else {
            return;
        }
        timeGap = Math.floor(timeGap / 1000);
        let seconds = ("00" + timeGap % 60).slice(-2);
        timeGap = Math.floor(timeGap / 60);
        let minutes = ("00" + timeGap % 60).slice(-2);
        timeGap = Math.floor(timeGap / 60);
        let hours = ("00" + timeGap).slice(-2);
        this.setState({time: `${hours}:${minutes}:${seconds}`});
    }

    render() {
        return (<div>{this.state.time ? this.props.caption + this.state.time : null}</div>);
    }
}
StopWatch.propTypes = propTypes;
StopWatch.defaultProps = defaultProps;

export default StopWatch;
