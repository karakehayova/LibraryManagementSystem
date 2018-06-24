import React from 'react'
import { getBookById, deleteBook, likeBook, dislikeBook } from '../../requests'
import history from '../../history'
import { getUser } from '../../auth'

export class PreviewBook extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      book: {},
      liked: false,
      rating: 0
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
          let rating = response[0].likes.length
          let likeByUser = response[0].likes.filter((like) => {
            return like.user_id === getUser().id
          })
          let like = !!likeByUser.length
          this.setState({ book: response[0], rating: rating, liked: like })
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

  rateBook (book_id, user_id) {
    likeBook(book_id, user_id).then((result) => {
      this.setState({ liked: true, rating: this.state.rating + 1 })
    })
      .catch((err) => {
        console.log(err)
      })
  }

  downvoteBook (book_id, user_id) {
    dislikeBook(book_id, user_id).then((result) => {
      this.setState({ liked: false, rating: this.state.rating - 1 })
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

    let rateIcon = !this.state.liked ? <i className='material-icons'>thumb_up</i> : <i className='material-icons'>thumb_down</i>

    let rate = !getUser().admin ? <span style={{ 'float': 'right' }}>
      <span onClick={() => {
        if (this.state.liked) {
          this.downvoteBook(book.id, getUser().id)
        } else {
          this.rateBook(book.id, getUser().id)
        }
      }}>
        {rateIcon}
        {'Total likes:' + this.state.rating}
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
          {rate}
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
