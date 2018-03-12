import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string,
  sid: PropTypes.number,
  photo: PropTypes.oneOfType([
    PropTypes.string
  ]),
  _id: PropTypes.string,
  countPerRow: PropTypes.number
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
        let photoStyle = {
          'max-width': '200px',
          'height': '100%'
        };

        return(
          <div className={"card col-md-" + (12 / this.props.countPerRow)} onClick={this.onClick}>
            <center>
              <img className="card-img-top" src={this.state.photo} style={photoStyle} />
            </center>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="row" style={{'font-size': '0.8em'}}>
                  <div className="col-md-6">{this.state.name}</div>
                  <div className="col-md-6">{this.state.sid}</div>
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
