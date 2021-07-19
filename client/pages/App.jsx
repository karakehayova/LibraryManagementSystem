import LoginForm from '../components/LoginForm'
import BooksTable from '../components/Books/BooksTable'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function App (){
  const[showBooks, setShowBooks] = useState(false)
  const[showLogin, setShowLogin] = useState(false)

    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item active'>
            <Link className='nav-link' to='/'> Home </Link>
          </li>
          <li className='nav-item'>
            <a className='nav-link' onClick={() => {
              setShowLogin(!showLogin)
            }}>Login</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' onClick={() => {
              setShowBooks(!showBooks)
            }}>Books</a>
            {showLogin ? <LoginForm /> : null}
            {showBooks ? <BooksTable /> : null}
          </li>
        </ul>
      </nav>
    )
}
