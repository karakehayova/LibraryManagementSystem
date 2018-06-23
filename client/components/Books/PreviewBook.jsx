import React from 'react'
import { getBookById, deleteBook } from '../../requests'
import history from '../../history'
import { getUser } from '../../auth'

export class PreviewBook extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      book: {}
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (prevState.id !== nextProps.match.params.id) {
      return { id: nextProps.match.params.id }
    }
    return null
  }

  componentDidMount () {
    if (this.state.id) {
      getBookById(this.state.id)
        .then((response) => {
          this.setState({ book: response[0] })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  delete (id) {
    deleteBook(id).then((result) => {
      this.setState({ book: { deleted: true } })
    })
      .catch((err) => {
        console.log(err)
      })
  }

  render () {
    let book = this.state.book
    let status = book.borrowed ? 'not available' : 'available'
    let bookUrl = book.url ? <img className='media-object' src={book.url} /> : ''
    let deleteBook = getUser().admin ? <span style={{ 'float': 'right' }}>
      <span onClick={() => {
        this.delete(book.id)
      }}>
        <i className='material-icons'>delete</i>
      </span>
    </span> : ''

    if (book.deleted) {
      return <div class='alert alert-success' role='alert'> The book was successfully deleted.</div>
    }

    return (
      <div className='card text-center' style={{ 'width': '50%' }}>
        <div className='card-header'>
          {book.name}
          {deleteBook}
        </div>
        {bookUrl}
        <div className='card-body'>
          <h5 className='card-title'>{'By: ' + book.author}</h5>
          <h5 className='card-subtitle text-muted'>{'Status: ' + status}</h5>
        </div>
      </div>
    )
  }
}

export default PreviewBook
