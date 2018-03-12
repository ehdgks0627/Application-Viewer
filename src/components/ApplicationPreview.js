import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string,
  sid: PropTypes.number,
  photo: PropTypes.oneOfType([
    PropTypes.string
  ]),
  _id: PropTypes.string
};

const defaultProps = {
  name: '',
  sid: -1,
  photo: '',
  _id: ''
};

class ApplicationPreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            sid: this.props.sid,
            photo: this.props.photo,
            _id: this.props._id
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
      window.location = '/application/' + this.state._id;
    }

    render() {

        return(
          <div onClick={this.onClick}>
            <div>preview</div>
          </div>
        );
    }
}
ApplicationPreview.propTypes = propTypes;
ApplicationPreview.defaultProps = defaultProps;

export default ApplicationPreview;
