
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App.jsx';
import {Provider} from 'react-redux';
import store from './components/redux_components/store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      
      </Provider>
    </React.StrictMode>,
   
    document.getElementById('root')
  );
  