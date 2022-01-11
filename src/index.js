//REACT APP SETUP
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

//STYLES
import "./styles/css/index.css"
import "./styles/css/navigation-menu.css"
import "./styles/css/pages/login-register-page.css"
import "./styles/css/pages/user-page.css"
import "./styles/css/pages/admin-page.css"
import "./styles/css/pages/admin-console-page.css"
import "./styles/css/pages/edit-task-page.css"
import "./styles/css/pages/edit-user-profile.css";

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
