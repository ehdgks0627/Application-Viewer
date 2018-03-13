import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import ApplicationList from './ApplicationList';
import Application from './Application';


const propTypes = {
  makeAlert: PropTypes.func
};

const defaultProps = {
  makeAlert: () => {console.log('makeAlert is not defined')}
};


class Main extends Component {

    render() {
        return(
          <main>
            <Switch>
              <Route exact path='/application/:id' render={(props) => <Application makeAlert={this.props.makeAlert} {...props} />} />
              <Route exact path='/list' component={ApplicationList} />
              <Redirect from='*' to='/list' />
            </Switch>
          </main>
        );
    }
}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
