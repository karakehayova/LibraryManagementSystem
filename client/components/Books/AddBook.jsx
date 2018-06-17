import React from 'react'
import { postBook } from '../../requests'

export class AddBook extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      book: {
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
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    if (e) {
      const target = e.target
      const value = target ? target.value : e.value
      const name = target ? target.name : ''
      let fields = Object.assign({}, this.state.book)
      fields[name] = value
      this.setState({
        book: fields
      })
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    postBook(this.state.book)
  }

  render () {
    let form = <form onSubmit={this.handleSubmit}>
      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Title</label>
        <div className='col-sm-10'>
          <input type='text' className='form-control form-control-sm' value={this.state.book.name} name='name' required onChange={this.handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Author</label>
        <div className='col-sm-10'>
          <input type='text' className='form-control form-control-sm' value={this.state.book.author} name='author' required onChange={this.handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Subject</label>
        <div className='col-sm-10'>
          <input type='text' className='form-control form-control-sm' value={this.state.book.subject} name='subject' required onChange={this.handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Genre</label>
        <div className='col-sm-10'>
          <input type='text' className='form-control form-control-sm' value={this.state.book.genre} name='genre' required onChange={this.handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Publisher</label>
        <div className='col-sm-10'>
          <input type='text' className='form-control form-control-sm' value={this.state.book.publisher} name='publisher' required onChange={this.handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Edition</label>
        <div className='col-sm-10'>
          <input type='text' className='form-control form-control-sm' value={this.state.book.edition} name='edition' required onChange={this.handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Shelf Id</label>
        <div className='col-sm-10'>
          <input type='number' className='form-control form-control-sm' value={this.state.book.shelf_id} name='shelf_id' required onChange={this.handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Row</label>
        <div className='col-sm-10'>
          <input type='number' className='form-control form-control-sm' value={this.state.book.row} name='row' required onChange={this.handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Column</label>
        <div className='col-sm-10'>
          <input type='number' className='form-control form-control-sm' value={this.state.book.column} name='column' required onChange={this.handleChange} />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-1 col-form-label'>Image URL</label>
        <div className='col-sm-10'>
          <input type='text' className='form-control form-control-sm' value={this.state.book.url} name='url' onChange={this.handleChange} />
        </div>
      </div>

      <button type='submit' className='btn btn-warning'>Submit</button>

    </form>

    return <div>
      {form}
    </div>
  }
}
export default AddBook
