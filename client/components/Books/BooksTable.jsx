import React from 'react'
import ReactTable from 'react-table'
import { getBooks, borrowBook } from '../../requests'
import { capitalize, splitByCapital } from '../../util'
import { getUser } from '../../auth'
import history from '../../history'

export class BooksTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      books: []
    }
  }
  componentDidMount () {
    getBooks()
			.then((response) => {
  this.setState({ books: response })
})
			.catch((error) => {
  console.log(error)
})
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

  borrow (id) {
    if (this.props.userId) { borrowBook(this.props.userId, id) }
  }

  prepareTableData () {
    let user = getUser()
    if (user.admin) {
      return this.state.books.map((book) => {
        return {
          id: book.id,
          name: <a className='text-primary' onClick={() => { history.push('/book/' + book.id) }}> {book.name} </a>,
          author: book.author,
          genre: book.genre,
          available: book.borrowed ? 'no' : 'yes',
          borrow: book.borrowed ? '' : <button onClick={() => { this.borrow(book.id) }}>Borrow</button>
        }
      })
    }	else {
      return this.state.books.map((book) => {
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

  render () {
    let user = getUser()
    if (user && this.state.books.length) {
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
    }		else {
      return <div>
				You are not authenticated
				</div>
    }
  }
}

export default BooksTable
