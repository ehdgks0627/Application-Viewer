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
              <h4>{this.props.title}({this.props.content ? this.props.content.length : 0})</h4>
                <br />
                {this.props.content ? this.props.content.split('\n').map(function(item) {
                    return (
                        <div>
                          {item}
                          <br/>
                        </div>
                    )
                }) : ''}
            </li>
        );
    }
}
ApplicationItemReadOnly.propTypes = propTypes;
ApplicationItemReadOnly.defaultProps = defaultProps;

export default ApplicationItemReadOnly;
