import React from 'react'
import { Link } from 'react-router-dom'
export default function App() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <ul className='navbar-nav mr-auto'>
        <li className='nav-item active'>
          <Link className='nav-link' to='/books'> Books </Link>
        </li>
      </ul>
    </nav>

  )
}
