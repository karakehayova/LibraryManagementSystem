import React, { useState, useEffect } from 'react'
import { getUserByID } from '../../requests'
import { getUser } from '../../auth'
import BorrowedTable from '../Books/BorrowedTable'
import history from '../../utils/history'
import { useParams } from 'react-router-dom'

export default function PersonalInfo() {
  const { id } = useParams()
  const [user, setUser] = useState({})


  useEffect(() => {
    let currentUser = getUser()
    getUserByID(currentUser.id)
      .then((response) => {
        setUser(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  if (Object.keys(user).length) {
      let books = user.user_books.length ? <BorrowedTable id={id} books={user.user_books} /> : 'You have no borrowed books'

    return <div>
      <div className='card' style={{ width: '18rem' }}>
        <div className='card-body'>
          <h5 className='card-title'>{user.first_name} {user.last_name}</h5>
          <h6 className='card-subtitle mb-2 text-muted'>{user.username}</h6>
          <p className='card-text'>Email: {user.email}</p>
          <a href='#password' onClick={() => { history.push('update/user/' + user.id) }} className='card-link'>Change password</a>
        </div>
      </div>
      {books}
    </div>
  }
  return ''
}
