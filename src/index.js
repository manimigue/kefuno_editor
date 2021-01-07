import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import watchForHover from './watchForHover'

import './sass/index.scss'
import './sass/fonts.scss'

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

watchForHover()

console.log(process.env.PUBLIC_URL);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history} basename='/kefuno_editor'>
        <App/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
