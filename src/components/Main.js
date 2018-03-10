import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';

import List from './List';
import Application from './Application';

class Main extends Component {

    render() {
        return(
          <main>
            <Switch>
              <Route exact path='/application/:id' component={Application}/>
              <Route exact path='/list' component={List}/>
              <Redirect from='*' to='/list' />
            </Switch>
          </main>
        );
    }
}
export default Main;
