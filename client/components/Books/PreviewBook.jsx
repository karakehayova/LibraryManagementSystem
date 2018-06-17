import React from 'react'
import { getBookById, deleteBook } from '../../requests'
import history from '../../history'

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
  render () {
    let book = this.state.book
    let status = book.borrowed ? 'not available' : 'available'
    let bookUrl = book.url ? <img className='media-object' src={book.url} /> : ''

    return (
      <div className='card text-center' style={{ 'width': '60%' }}>
        <div className='card-header'>
          {book.name}
          <span style={{ 'float': 'right' }}>
            <span onClick={() => {
              deleteBook(book.id)
            }}>
              <i className='material-icons'>delete</i>
            </span>
          </span>
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
