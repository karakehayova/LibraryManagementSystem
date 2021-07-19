import React, { useState, useEffect } from 'react'
import { getBookById, deleteBook, likeBook, dislikeBook } from '../../requests'
import history from '../../utils/history'
import { getUser } from '../../auth'
import { useParams } from 'react-router-dom'

export default function PreviewBook() {
  const { id } = useParams()

  const [bookRating, setBookRating] = useState({
    liked: false,
    disliked: false,
    rating: 0
  })
  const [bookData, setBook] = useState({})

  useEffect(() => {
    if (id) {
      getBookById(id)
        .then((response) => {
          let likes = response.books_likes_dislikes.filter((reaction) => {
            return reaction.action === 'like'
          })
          let dislikes =  response.books_likes_dislikes.filter((reaction) => {
            return reaction.action === 'dislike'
          })
          let rating = likes.length - dislikes.length
          let likeByUser = likes.filter((like) => {
            return like.user_id === getUser().id
          })
          let dislikeByUser = dislikes.filter((dislike)=>{
            return dislike.user_id === getUser().id
          })
          let like = !!likeByUser.length
          let dislike = !!dislikeByUser.length
          setBookRating({ rating: rating, liked: like, disliked: dislike })
          setBook(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, []);

  function delBook(id) {
    deleteBook(id).then((result) => {
      setBook({ deleted: true })
    })
      .catch((err) => {
        console.log(err)
      })
  }

  function rateBook(bookId, userId) {
    likeBook(bookId, userId).then((result) => {
      setBookRating({ liked: true, rating: bookRating.rating + 1 })
    })
      .catch((err) => {
        console.log(err)
      })
  }

  function downvoteBook(bookId, userId) {
    dislikeBook(bookId, userId).then((result) => {
      setBookRating({ liked: false, rating: bookRating.rating - 1 })
    })
      .catch((err) => {
        console.log(err)
      })
  }

  let status = bookData.borrowed ? 'not available' : 'available'
  let bookUrl = bookData.url ? <img className='media-object' style={{ 'objectFit': 'contain',
    'height': '300px'}} src={bookData.url} /> : ''
  let deletedBook = getUser().admin ? <span style={{ 'float': 'right' }}>
    <span onClick={() => {
      delBook(bookData.id)
    }}>
      <i className='material-icons'>delete</i>
    </span>
  </span> : ''

  let rateIcon = !bookRating.liked ? <i className='material-icons'>thumb_up</i> : <i className='material-icons'>thumb_down</i>

  let rate = !getUser().admin ? <span style={{ 'float': 'right' }}>
    <span onClick={() => {
      if (bookRating.liked) {
        downvoteBook(bookData.id, getUser().id)
      } else {
        rateBook(bookData.id, getUser().id)
      }
    }}>
      {rateIcon}
      {'Total likes:' + bookRating.rating}
    </span>
  </span> : ''

  let edit = getUser().admin ? <span style={{ 'float': 'right' }}>
    <span onClick={() => {
      history.push(`/book/edit/${id}`)
    }}>
      <i className='material-icons'>edit</i>
    </span>
  </span> : ''

  if (bookData.deleted) {
    return <div class='alert alert-success' role='alert'> The book was successfully deleted.</div>
  }

  return (
    <div className='card text-center'>
      <div className='card-header'>
        {bookData.name}
        {deletedBook}
        {edit}
        {rate}
      </div>
      {bookUrl}
      <div className='card-body'>
        <h5 className='card-title'>{'By: ' + bookData.author}</h5>
        <h5 className='card-subtitle text-muted'>{'Status: ' + status}</h5>
        <p class='card-text'>{'Publisher: ' + bookData.publisher}</p>
        <p class='card-text'>{'Description: ' + bookData.subject}</p>
      </div>
    </div>
  )
}
