import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import axios from 'axios';
import { connect } from 'react-redux';

import { API_SERVER_URL } from '../config';
import blankImage from '../static/blank.png';
import ApplicationPreview from './ApplicationPreview';

class ApplicationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            applications: [],
            countPerRow: 4
        };
    }

    componentDidMount() {
        axios.get(API_SERVER_URL + '/application')
            .then((result) => {
                this.setState({
                    applications: update(this.state.applications, {$push: result.data})
                });
            });

    }

    componentWillReceiveProps(nextProps, nextState) {
        let applicationIndex = this.state.applications.findIndex(function(element) {
            return element._id === nextProps._id;
        });
        if(applicationIndex !== -1 &&
            this.state.applications[applicationIndex].photo !== nextProps.photo) {
            this.setState({
                applications: update(this.state.applications, {
                    [applicationIndex]: {
                        photo: {
                            $set: nextProps.photo}}})
            });
        }
    }

    render() {
        let mainStyle = {
            'width': '50%',
            'min-width': '800px',
            'margin': '0 auto'
        };

        let rowStye = {
            'margin': '1em'
        };

        const mapToComponents = (data) => {
            data.sort();
            let components = data.map((item) => {
                return (<ApplicationPreview
                         photo={item.photo ? item.photo : blankImage}
                         name={item.name}
                         sid={item.sid}
                         _id={item._id}
                         countPerRow={this.state.countPerRow}
                         />);
            });

            let dom = [];
            let buffer = [] ;
            for(let i=0; i<components.length; i++) {
                buffer.push(components[i]);
                if ((i !== 0) && (i%this.state.countPerRow === this.state.countPerRow - 1)) {
                    dom.push((<div className="row" style={rowStye}>{buffer}</div>));
                    buffer = [];
                }
            }
            if(buffer.length !== 0) {
                dom.push((<div className="row" style={rowStye}>{buffer}</div>));
            }
            return dom;
        };

        return(
            <div style={mainStyle}><h1 style={{'text-align': 'center'}}>현재 지원자 수 : {this.state.applications.length}</h1>{mapToComponents(this.state.applications)}</div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return { photo: state.application.photo, _id: state.application._id };
};

export default connect(mapStateToProps)(ApplicationList);
