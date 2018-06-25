import React from 'react'
import { getUserByID } from '../../requests'

import BooksTable from '../Books/BooksTable'
import BorrowedTable from '../Books/BorrowedTable'

export class User extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      id: ''
    }
  }

  componentDidMount () {
    if (this.state.id) {
      getUserByID(this.state.id)
        .then((response) => {
          this.setState({ user: response[0] })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (prevState.id !== nextProps.match.params.id) {
      return { id: nextProps.match.params.id }
    }
    return null
  }

  render () {
    let borrowed = this.state.user && this.state.user.books ? <BorrowedTable id={this.state.id} books={this.state.user.books} /> : ''
    return <div>
      {borrowed}
      <BooksTable userId={this.state.id} />
    </div>
  }
}

export default User
