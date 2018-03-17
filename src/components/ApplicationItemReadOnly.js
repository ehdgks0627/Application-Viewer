import React, { Component } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    title: PropTypes.string.isrequired,
    content: PropTypes.string
};

const defaultProps = {
    title: '',
    content: ''
};

class ApplicationItemReadOnly extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <li className="list-group-item">
              <h4>{this.props.title}</h4>
                <br />
                {this.props.content}
            </li>
        );
    }
}
ApplicationItemReadOnly.propTypes = propTypes;
ApplicationItemReadOnly.defaultProps = defaultProps;

export default ApplicationItemReadOnly;
