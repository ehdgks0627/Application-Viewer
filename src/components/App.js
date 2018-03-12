import React, { Component } from 'react';

import Header from './Header';
import Main from './Main';
import Alert from './Alert';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        alert: ''
      };

      this.makeAlert = this.makeAlert.bind(this);
    }

    makeAlert(content) {
      this.setState({
        alert: <Alert content={content} />
      });
    }

    render() {
        return(
            <div>
              <Header />
              <Main />
              {this.state.alert}
            </div>
        );
    }
}

export default App;
