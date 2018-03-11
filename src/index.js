import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import reducers from './reducers';


import './style/theme.css';
import './style/theme.scss';
import './style/alert.css';


const store = createStore(reducers);

const root = document.getElementById("root");

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>),
  root
);
