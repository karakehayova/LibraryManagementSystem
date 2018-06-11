import React from 'react'
import { connect } from 'react-redux'
import Remarkable from 'remarkable'
import {getBookById, deleteBook} from '../../requests'
import history from '../../history'

export class PreviewBook extends React.Component {
  render () {
    let book = this.props.book
    let status = book.borrowed ? 'not available': 'available'

    return (
      <div className='card text-center' style={{'width': '60%'}}>
        <div className='card-header'>
          {book.name}
          <span style={{'float': 'right'}}>
            <span onClick={() => {
              deleteBook(book.id)
            }}>
              <i className='material-icons'>delete</i>
            </span>
        </div>

        <img className='media-object' src={book.url} />
        <div className='card-body'>
          <h5 className='card-title'>{'By: ' + book.author}</h5>
          <h5 className='card-subtitle text-muted'>{'Status: ' + status}</h5>
        </div>
      </div>
    )
  }
}

export default PreviewBook