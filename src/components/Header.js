import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {

    render() {
        return(
          <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <div className="container">
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
              <div className="collapse navbar-collapse text-center justify-content-center" id="navbarHeader">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                    className="nav-link"
                    to="/list">
                    지원서 리스트
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        );
    }
}

export default Header;
