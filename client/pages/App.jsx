import LoginForm from '../components/LoginForm'
import BooksTable from '../components/Books/BooksTable'
import React from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../auth'

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showBooks: false,
      showLogin: false
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
            <a className='nav-link' onClick={() => {
              this.setState({showLogin: !this.state.showLogin})
            }}>Login</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' onClick={() => {
              this.setState({showBooks: !this.state.showBooks})
            }}>Books</a>
            {this.state.showLogin ? <LoginForm /> : ''}
            {this.state.showBooks ? <BooksTable /> : ''}
          </li>
        </ul>
      </nav>
    )
  }
}

export default App
