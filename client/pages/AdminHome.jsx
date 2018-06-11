import React from 'react'
import history from '../history'
import { Link } from 'react-router-dom'
import { getUser, deauthenticateUser } from '../auth'

// components
import BooksTable from '../components/Books/BooksTable'
import AddBook from '../components/Books/AddBook'
import UserTable from '../components/Users/UserTable'
import RegisterForm from '../components/RegisterForm'

export class AdminHome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showBooks: false,
      showRegister: false,
      showUsers: false,
      showBookForm: false
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
                this.setState({
                  showRegister: !this.state.showRegister,
                  showBooks: false,
                  showUsers: false, 
                  showBookForm:false
                })
              }}>Register</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => {
                this.setState({
                  showBooks: !this.state.showBooks,
                  showRegister: false,
                  showBookForm: false,
                  showUsers:false
                })
              }}>Books</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => {
                this.setState({
                  showUsers: !this.state.showUsers,
                  showRegister: false,
                  showBooks: false,
                  showBookForm: false
                })
              }}>Users</a>
            </li>
                  <li className='nav-item'>
              <a className='nav-link' onClick={() => {
                this.setState({
                  showBookForm: !this.state.showBookForm,
                  showUsers: false,
                  showRegister: false,
                  showBooks: false
                })
              }}>Add Book</a>
            </li>
          </ul>
        </nav>
        {this.state.showBooks ? <BooksTable /> : ''}
        {this.state.showRegister ? <RegisterForm /> : ''}
        {this.state.showUsers ? <UserTable /> : ''}
        {this.state.showBookForm ? <AddBook /> : ''}

      </div>
    )
  }
}

export default AdminHome
