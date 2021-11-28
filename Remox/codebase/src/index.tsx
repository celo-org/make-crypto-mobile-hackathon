import React from 'react';
import ReactDOM from 'react-dom';
import './dist/index.css';
import App from './App';
import store from './redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);

