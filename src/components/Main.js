import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import ApplicationList from './ApplicationList';
import Application from './Application';
import NotFound from './NotFound';


const propTypes = {
  startInterview: PropTypes.func
};

const defaultProps = {
  startInterview: () => {console.log('startInterview is not defined')},
  endInterview: () => {console.log('endInterview is not defined')}
};

class Main extends Component {

    render() {
        return(
          <main>
            <Switch>
              <Route exact path='/application/:id'
              render={(props) => (
                <Application
                startInterview={this.props.startInterview}
                endInterview={this.props.endInterview}
                ref={(applicationElement) => {this.applicationElement = applicationElement;}}
                {...props}
                />)}
              />
              <Route exact path='/list' component={ApplicationList} />
              <Route component={NotFound} />
            </Switch>
          </main>
        );
    }
}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
