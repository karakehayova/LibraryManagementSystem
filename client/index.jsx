import history from './history'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, Switch} from 'react-router-dom'

// styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-table/react-table.css'

// components and pages
import App from './pages/App.jsx'
import UserHome from './pages/UserHome.jsx'
import AdminHome from './pages/AdminHome.jsx'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import ErrorPage from './components/ErrorPage'
import Info from './components/Info'
import Home from './components/Home'
import BooksTable from './components/BooksTable'
import User from './components/User'
import setAuthorizationToken from './setAuthorizationToken'

if (localStorage.token) {
  setAuthorizationToken(localStorage.token)
}

ReactDOM.render((
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/error' component={ErrorPage} />
      <Route exact path='/register' component={RegisterForm} />
      <Route exact path='/info' component={UserHome} />
      <Route exact path='/admin' component={AdminHome} />
      <Route exact path='/books' component={BooksTable} />
      <Route exact path='/user/:id' component={User} />
    </Switch>
  </Router>
),
	document.getElementById('root')
)
