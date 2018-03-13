import React, { Component } from 'react';

import Header from './Header';
import Main from './Main';
import Alert from './Alert';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        content: ''
      };

      this.makeAlert = this.makeAlert.bind(this);
    }

    makeAlert(content, _id) {
      this.setState({
        content: content,
        _id: _id
      });
    }

    render() {
        return(
            <div>
              <Header />
              <Main makeAlert={this.makeAlert} />
              {(this.state.content && this.state._id) ? <Alert content={this.state.content} _id={this.state._id} /> : <div></div> }
            </div>
        );
    }
}

export default App;
