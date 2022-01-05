import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
//REDUX
import {accountReducer} from './redux/reducers/accountReducer'
import {Provider} from "react-redux"
import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk" 

import "./styles/css/index.css"
import "./styles/css/navigation-menu.css"
import "./styles/css/pages/login-register-page.css"
import "./styles/css/pages/user-page.css"
import "./styles/css/pages/admin-page.css"
import "./styles/css/pages/admin-console-page.css"

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(accountReducer , composeEnchancer(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
