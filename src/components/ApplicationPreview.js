import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string.isrequired,
    sid: PropTypes.number.isrequired,
    photo: PropTypes.string.isrequired,
    _id: PropTypes.string.isrequired,
    countPerRow: PropTypes.number.isrequired
};

const defaultProps = {
    name: '',
    sid: -1,
    photo: '',
    _id: '',
    countPerRow: 4
};

class ApplicationPreview extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
      window.location = '/application/' + this.props._id;
    }

    render() {
        let photoContainerStyle = {
            'display': 'table'
        };

        let photoInnerContainerStyle = {
            'display': 'table-cell',
            'vertical-align': 'middle',
            'width': '10em',
            'height': '10em',
        };

        let photoStyle = {
            'width': 'auto',
            'height': 'auto',
            'max-width': '100%',
            'max-height': '100%',
            'margin': '0 auto'
        };

        return(
          <div className={"card col-md-" + (12 / this.props.countPerRow)} onClick={this.onClick}>
            <center>
              <div style={photoContainerStyle}>
                <div style={photoInnerContainerStyle}>
                  <img className="card-img-top" src={this.props.photo} style={photoStyle} />
                </div>
              </div>
            </center>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="row" style={{'font-size': '0.8em'}}>
                  <div className="col-md-6">{this.props.name}</div>
                  <div className="col-md-6">{this.props.sid}</div>
                </div>
              </li>
            </ul>
          </div>
        );
    }
}
ApplicationPreview.propTypes = propTypes;
ApplicationPreview.defaultProps = defaultProps;

export default ApplicationPreview;
