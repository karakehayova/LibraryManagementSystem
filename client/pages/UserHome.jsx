import BooksTable from '../components/Books/BooksTable'
import React from 'react'
import history from '../history'
import { Link } from 'react-router-dom'
import { getUser, deauthenticateUser } from '../auth'

export class UserHome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showBooks: false
    }
  }

  render () {
    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => {
                deauthenticateUser()
                history.push('/')
              }}>Logout</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => {
                this.setState({ showBooks: !this.state.showBooks })
              }}>Books</a>
            </li>
          </ul>
        </nav>
        {this.state.showBooks ? <BooksTable /> : ''}
      </div>
    )
  }
}

export default UserHome
