// import App from "./App.jsx";
// import "../semantic/dist/semantic.min.css";
import LoginForm from './components/LoginForm'
import Test from './pages/test'
// import RegisterForm from './RegisterForm.jsx';
// import UserPage from './UserPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { Switch } from 'react-router'

import setAuthorizationToken from './setAuthorizationToken'
// import { connect } from 'react-redux'
// import './index.css';


if (localStorage.token) {
  setAuthorizationToken(localStorage.token)
}

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginForm} />
      {/* <Route path="/register" component={RegisterForm} />
      <Route path="/admin" component={App} />
      <Route path="/info" component={UserPage} /> */}
    </Switch>
  </BrowserRouter>
),
  document.getElementById('root')
);