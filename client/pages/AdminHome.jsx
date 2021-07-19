import React, { useState } from 'react'
import history from '../utils/history'
import { deauthenticateUser } from '../auth'

// components
import BooksTable from '../components/Books/BooksTable'
import AddBook from '../components/Books/AddBook'
import UserTable from '../components/Users/UserTable'
import RegisterForm from '../components/RegisterForm'

export default function AdminHome () {
  const [showBooks, setShowBooks] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showUsers, setShowUsers] = useState(false)
  const [showBookForm, setShowBookForm] = useState(false)

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
                setShowRegister(!showRegister)
                setShowBooks(false)
                setShowUsers(false)
                setShowBookForm(false)
              }}>Register</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => {
                setShowBooks(!showBooks)
                setShowRegister(false)
                setShowUsers(false)
                setShowBookForm(false)
              }}>Books</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => {
                setShowUsers(!showUsers)
                setShowBooks(false)
                setShowRegister(false)
                setShowBookForm(false)
              }}>Users</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => {
                setShowBookForm(!showBookForm)
                setShowUsers(false)
                setShowBooks(false)
                setShowRegister(false)
              }}>Add Book</a>
            </li>
          </ul>
        </nav>
        {showBooks ? <BooksTable /> : null}
        {showRegister ? <RegisterForm /> : null}
        {showUsers ? <UserTable /> : null}
        {showBookForm ? <AddBook /> : null}

      </div>
    )
}
