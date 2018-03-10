import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {

};

const defaultProps = {

};

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
          <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <div className="container">
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
              <div className="collapse navbar-collapse text-center justify-content-center" id="navbarHeader">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/list">지원서 페이지</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/list">지원자 확인</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        );
    }
}
Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
