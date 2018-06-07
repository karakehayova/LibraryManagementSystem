import App from './pages/App.jsx'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Main from './components/Main'
import ErrorPage from './components/ErrorPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import history from './history'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router-dom'
import { Switch } from 'react-router'

import setAuthorizationToken from './setAuthorizationToken'

if (localStorage.token) {
  setAuthorizationToken(localStorage.token)
}

ReactDOM.render((
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/info' component={Main} />
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/error' component={ErrorPage} />
      <Route exact path='/register' component={RegisterForm} />
    </Switch>
  </Router>
),
	document.getElementById('root')
)
