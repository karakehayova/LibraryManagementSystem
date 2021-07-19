import BooksTable from '../components/Books/BooksTable'
import PersonalInfo from '../components/Users/PersonalInfo'
import React, { useState } from 'react'
import history from '../utils/history'
import { deauthenticateUser } from '../auth'

export default function UserHome() {
  const [showBooks, setShowBooks] = useState(false)
  const [personalInfo, setPersonalInfo] = useState(false)

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
              setShowBooks(!showBooks)
              setPersonalInfo(false)
            }}>Books</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' onClick={() => {
              setPersonalInfo(!personalInfo)
              setShowBooks(false)
            }}>Personal Info</a>
          </li>
        </ul>
      </nav>
      {showBooks ? <BooksTable /> : ''}
      {personalInfo ? <PersonalInfo /> : ''}
    </div>
  )
}
