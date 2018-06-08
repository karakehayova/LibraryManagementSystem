import App from '../pages/App.jsx'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ErrorPage from './ErrorPage'
import Info from './Info'
import Home from './Home'
import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

const Main = ()=>(
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/error' component={ErrorPage} />
      <Route exact path='/register' component={RegisterForm} />
			<Route exact path='/info' component={Info} />
    </Switch>
  </main>
)

export default Main
