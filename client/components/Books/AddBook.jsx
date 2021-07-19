import React, { useState, useEffect } from 'react'
import { postBook, getBookById, editBook } from '../../requests'
import history from '../../utils/history'
import { useParams } from 'react-router-dom'

export default function AddBook() {
  const { id } = useParams()
  const [bookData, setBookData] = useState({
    name: '',
    author: '',
    subject: '',
    genre: '',
    publisher: '',
    edition: 1,
    shelf_id: 0,
    row: 0,
    column: 0,
    url: ''
  })

  useEffect(() => {
    if (id) {
      getBookById(id)
        .then((response) => {
          setBookData(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, []);

  function handleChange(e) {
    if (e) {
      const target = e.target
      const name = target ? target.name : ''
      let value = target ? target.value : e.value

      if (['shelf_id', 'row', 'column', 'edition'].includes(name)) {
        value = parseInt(value)
      }
      let fields = Object.assign({}, bookData)
      fields[name] = value
      setBookData(fields)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (id) {
      let editedBook = bookData
      delete editedBook.borrow_date
      delete editedBook.borrowed
      delete editedBook.likes
      delete editedBook.return_date
      delete editedBook.returned
      delete editedBook.user
      delete editedBook.user_id

      editBook(editedBook)
      history.push(`/book/${id}`)
    } else {
      postBook(bookData)
      history.push(`/book/${id}`)
    }
  }

    let form = <form onSubmit={handleSubmit}>
      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Title</label>
        <div className='col-sm-10'>
          <input type='text' className='form-control form-control-sm' value={bookData.name} name='name' required onChange={handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Author</label>
        <div className='col-sm-10'>
          <input type='text' className='form-control form-control-sm' value={bookData.author} name='author' required onChange={handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Subject</label>
        <div className='col-sm-10'>
          <input type='text' className='form-control form-control-sm' value={bookData.subject} name='subject' required onChange={handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Genre</label>
        <div className='col-sm-10'>
          <input type='text' className='form-control form-control-sm' value={bookData.genre} name='genre' required onChange={handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Publisher</label>
        <div className='col-sm-10'>
          <input type='text' className='form-control form-control-sm' value={bookData.publisher} name='publisher' required onChange={handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Edition</label>
        <div className='col-sm-10'>
          <input type='text' className='form-control form-control-sm' value={bookData.edition} name='edition' required onChange={handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Shelf Id</label>
        <div className='col-sm-10'>
          <input type='number' className='form-control form-control-sm' value={bookData.shelf_id} name='shelf_id' required onChange={handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Row</label>
        <div className='col-sm-10'>
          <input type='number' className='form-control form-control-sm' value={bookData.row} name='row' required onChange={handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Column</label>
        <div className='col-sm-10'>
          <input type='number' className='form-control form-control-sm' value={bookData.column} name='column' required onChange={handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Image URL</label>
        <div className='col-sm-10'>
          <input type='text' className='form-control form-control-sm' value={bookData.url} name='url' onChange={handleChange} />
        </div>
      </div>

      <button type='submit' className='btn btn-warning'>Submit</button>

    </form>

    return <div>
      {form}
    </div>
}
