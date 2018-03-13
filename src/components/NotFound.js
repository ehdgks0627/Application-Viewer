import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NotFound extends Component {

    constructor(props) {
        super(props);
        window.location='/list';
    }

    render() {
      return (
        <div>NotFound</div>
      );
    }
}

export default NotFound;
