import React from 'react'
import { getUserByID } from '../../requests'
import { getUser } from '../../auth'
import BorrowedTable from '../Books/BorrowedTable'
import history from '../../history'
import moment from 'moment'
export class PersonalInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      id: ''
    }
  }

  componentDidMount () {
    let user = getUser()
    getUserByID(user.id)
      .then((response) => {
        this.setState({ user: response[0] })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    if (Object.keys(this.state.user).length) {
      let books = this.state.user.books.length ? <BorrowedTable id={this.state.id} books={this.state.user.books} /> : 'You have no borrowed books'
      let endDate = moment.unix(this.state.user.start_date).add(this.state.user.subscription, 'months')
      let result = endDate.from(this.state.startDate)
      let active = endDate > moment()
      let registration = `Your registration is ${active ? 'active' : 'inactive'}`
      let expireMessage = `It expires ${result}`

      return <div>
        <div className='card' style={{ width: '18rem' }}>
          <div className='card-body'>
            <h5 className='card-title'>{this.state.user.first_name} {this.state.user.last_name}</h5>
            <h6 className='card-subtitle mb-2 text-muted'>{this.state.user.username}</h6>
            <p className='card-text'>Email: {this.state.user.email}</p>
            <p className='card-text'>{registration} </p>
            <p className='card-text'> {expireMessage}</p>
            <a href='#password' onClick={() => { history.push('update/user/' + this.state.user.id) }} className='card-link'>Change password</a>
          </div>
        </div>
        {books}
      </div>
    }
    return ''
  }
}

export default PersonalInfo
