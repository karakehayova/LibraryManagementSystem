import BooksTable from '../components/Books/BooksTable'
import PersonalInfo from '../components/Users/PersonalInfo'
import React from 'react'
import history from '../history'
import { deauthenticateUser } from '../auth'

export class UserHome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showBooks: false,
      personalInfo: false
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
                this.setState({ showBooks: !this.state.showBooks, personalInfo: false })
              }}>Books</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => {
                this.setState({ personalInfo: !this.state.personalInfo, showBooks: false })
              }}>Personal Info</a>
            </li>
          </ul>
        </nav>
        {this.state.showBooks ? <BooksTable /> : ''}
        {this.state.personalInfo ? <PersonalInfo /> : ''}
      </div>
    )
  }
}

export default UserHome
