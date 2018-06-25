import React from 'react'
import ReactTable from 'react-table'
import { returnBook } from '../../requests'
import { capitalize } from '../../util'
import { getUser } from '../../auth'

export class BorrowedTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      books: [],
      returned: ''
    }
  }

  getColumns (books) {
    let columns = Object.keys(books[0])
    return columns.map((col) => {
      return {
        minWidth: col.length * 20,
        Header: capitalize(col),
        accessor: col
      }
    })
  }

  prepareTableData () {
    let user = getUser()
    if (user.admin) {
      return this.props.books.map((book) => {
        return {
          id: book.id,
          name: book.name,
          author: book.author,
          borrow_date: book.borrow_date,
          return_date: book.return_date,
          returned: book.returned ? 'yes' : 'no',
          returnBook: book.returned ? '' : <button onClick={() => {
            returnBook(this.props.id, book.id).then(() => {
              this.setState({ returned: 'returned' })
            })
          }}>Return</button>
        }
      })
    } else {
      return this.props.books.map((book) => {
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

  render () {
    if (this.state.returned) {
      return <div className='alert alert-success' role='alert'> The book was successfully returned.</div>
    }
    let user = getUser()
    if (user && this.props.books.length) {
      let books = this.prepareTableData()
      let columns = this.getColumns(books)

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
}

export default BorrowedTable
