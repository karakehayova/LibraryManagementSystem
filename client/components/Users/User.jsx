import React, { useEffect, useState } from 'react'
import { getUserByID } from '../../requests'
import { useParams } from 'react-router-dom'

import BooksTable from '../Books/BooksTable'
import BorrowedTable from '../Books/BorrowedTable'

export default function User() {
  const { id } = useParams()

  const [user, setUser] = useState({})

  useEffect(() => {
    if (id) {
      getUserByID(id)
        .then((response) => {
          setUser(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, []);

  let borrowed = user && user.books ? <BorrowedTable id={id} books={user.books} /> : ''
  return <div>
    {borrowed}
    <BooksTable userId={id} />
  </div>
}
