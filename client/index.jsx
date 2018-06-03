import App from './pages/App.jsx'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

import ErrorPage from './components/ErrorPage'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Switch } from 'react-router'

import setAuthorizationToken from './setAuthorizationToken'

if (localStorage.token) {
  setAuthorizationToken(localStorage.token)
}

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/error' component={ErrorPage} />
      <Route exact path='/register' component={RegisterForm} />
    </Switch>
  </BrowserRouter>
),
	document.getElementById('root')
)
