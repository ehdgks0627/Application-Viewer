import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import axios from 'axios';

import API_SERVER_URL from '../config.js';
import blankImage from '../static/blank.png';
import ApplicationPreview from './ApplicationPreview';

class ApplicationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          applications: []
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

    render() {
      const mapToComponents = (data) => {
          data.sort();
          return data.map((item) => {
              return (<ApplicationPreview
                       photo={item.photo ? item.photo : blankImage}
                       name={item.name}
                       sid={item.sid}
                       _id={item._id} />);
          });
      };

        return(
            <div>{mapToComponents(this.state.applications)}</div>
        );
    }
}

export default ApplicationList;
