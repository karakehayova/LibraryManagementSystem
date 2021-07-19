import React, { useState } from 'react'
import ReactTable from 'react-table'
import { returnBook } from '../../requests'
import { capitalize } from '../../utils/util'
import { getUser } from '../../auth'

export default function BorrowedTable(id, books) {
  const [returned, setReturned] = useState('')

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

  function prepareTableData() {
    let user = getUser()
    if (user.admin) {
      return books.map((book) => {
        return {
          id: book.id,
          name: book.name,
          author: book.author,
          borrow_date: book.borrow_date,
          return_date: book.return_date,
          returned: book.returned ? 'yes' : 'no',
          returnBook: book.returned ? '' : <button onClick={() => {
            returnBook(id, book.id).then(() => {
              setReturned('returned')
            })
          }}>Return</button>
        }
      })
    } else {
      return books.map((book) => {
        return {
          id: book.id,
          name: book.name,
          author: book.author,
          borrow_date: book.borrow_date,
          return_date: book.return_date,
          returned: book.returned ? 'yes' : 'no'
        }
      })
    }
  }

  if (returned) {
    return <div className='alert alert-success' role='alert'> The book was successfully returned.</div>
  }
  let user = getUser()
  if (user && books.length) {
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
    return ''
  }
}
