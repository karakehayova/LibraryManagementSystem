import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import { getBooks, borrowBook } from '../../requests'
import { capitalize } from '../../utils/util'
import { getUser } from '../../auth'
import history from '../../utils/history'


export default function BooksTable({ userId }) {

  const [booksData, setBooksData] = useState([])
  const [borrowed, setBorrowed] = useState('')

  useEffect(() => {
    getBooks()
      .then((response) => {
        setBooksData(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);



  function getColumns(books) {
    let columns = Object.keys(books[0])
    return columns.map((col) => {
      return {
        minWidth: col.length * 20,
        Header: capitalize(col),
        accessor: col
      }
    })
  }

  function borrow(id) {
    if (userId) {
      borrowBook(userId, id).then(() => {
        setBorrowed('borrowed')
      })
    }
  }

  function prepareTableData() {
    let user = getUser()
    if (user.admin && userId) {
      return booksData.map((book) => {
        return {
          id: book.id,
          name: <a className='text-primary' onClick={() => { history.push('/book/' + book.id) }}> {book.name} </a>,
          author: book.author,
          genre: book.genre,
          available: book.borrowed ? 'no' : 'yes',
          shelf: book.shelf_id,
          row: book.row,
          column: book.column,
          borrow: book.borrowed ? '' : <button onClick={() => { borrow(book.id) }}>Borrow</button>
        }
      })
    } else {
      return booksData.map((book) => {
        return {
          id: book.id,
          name: <a className='text-primary' onClick={() => { history.push('/book/' + book.id) }}> {book.name} </a>,
          author: book.author,
          genre: book.genre,
          available: book.borrowed ? 'no' : 'yes'
        }
      })
    }
  }

  if (borrowed) {
    return <div class='alert alert-success' role='alert'> The book was successfully borrowed.</div>
  }
  let user = getUser()
  if (user && booksData.length) {
    let books = prepareTableData()
    let columns = getColumns(books)

    return <div>
      <ReactTable
        data={books}
        columns={columns}
        className={'-striped -highlight'}
        showPagination={false}
        defaultPageSize={books.length}
      />
    </div>
  } else {
    return <div>
      No books yet
      </div>
  }
}
