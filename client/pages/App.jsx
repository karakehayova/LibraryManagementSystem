import LoginForm from '../components/LoginForm'
import React from 'react'
import {Link} from 'react-router-dom'
export class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item active'>
            <Link className='nav-link' to='/'> Home </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/login'> Login </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/register'> Register </Link>
          </li>
        </ul>
      </nav>

    )
  }
}

export default App
