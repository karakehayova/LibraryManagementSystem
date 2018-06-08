import Test from './app.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import history from './history'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router-dom'

import setAuthorizationToken from './setAuthorizationToken'

if (localStorage.token) {
  setAuthorizationToken(localStorage.token)
}

ReactDOM.render((
  <Router history={history}>
			<Test/>
  </Router>
),
	document.getElementById('root')
)
