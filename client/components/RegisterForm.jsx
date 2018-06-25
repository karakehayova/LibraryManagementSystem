import React, { Component } from 'react'
import { postUser, getUserByID, updateUser } from '../requests'

export class RegisterForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        username: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
        email: '',
        admin: 0,
        subscription: 1
      },
      error: '',
      id: '',
      added: false,
      updated: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (Object.keys(nextProps).length) {
      if (prevState.id !== nextProps.match.params.id) {
        return { id: nextProps.match.params.id }
      }
    }
    return null
  }

  componentDidMount () {
    if (this.state.id) {
      getUserByID(this.state.id)
    .then((response) => {
      this.setState({ data: response[0] })
    })
    .catch((error) => {
      console.log(error)
    })
    }
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name
    let data = Object.assign({}, this.state.data)
    data[name] = value
    this.setState({ data: data })
  }

  handleSubmit (event) {
    event.preventDefault()
    if (!this.state.id) {
      postUser(this.state.data)
    .then((response) => {
      if (response.errno) {
        this.setState({ error: 'This username or email are already taken.' })
      } else if (response.err) {
        this.setState({ error: response.err })
      } else {
        this.setState({ added: response, error: '' })
      }
    })
    .catch((error) => {
      console.log('err', error)
    })
    } else {
      let updateData = this.state.data
      delete updateData.books
      delete updateData.start_date
      updateUser(this.state.data)
    .then((response) => {
      this.setState({ updated: response, error: '' })
    })
    .catch((error) => {
      console.log(error)
    })
    }
  }

  render () {
    if (this.state.added) {
      return <div class='alert alert-success' role='alert'> The user was successfully registered.</div>
    }
    if (this.state.updated) {
      return <div class='alert alert-success' role='alert'> The user was successfully updated.</div>
    }
    let error = this.state.error ? <div className='alert alert-danger' role='alert'>
      {this.state.error} </div> : ''

    let buttonText = this.state.id ? 'Update' : 'Register'
    return (
      <form onSubmit={this.handleSubmit} role='form'>
        <h2>{buttonText}</h2>
        {error}
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='text' value={this.state.data.first_name} name='first_name' className='form-control input-lg' placeholder='First Name' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='text' value={this.state.data.last_name} name='last_name' className='form-control input-lg' placeholder='Last Name' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='text' value={this.state.data.username} name='username' className='form-control input-lg' placeholder='Username' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='email' value={this.state.data.email} name='email' className='form-control input-lg' placeholder='Email Address' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='password' name='password' className='form-control input-lg' placeholder='Password' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='password' name='password_confirmation' className='form-control input-lg' placeholder='Confirm Password' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='text' value={this.state.data.admin} name='admin' className='form-control input-lg' placeholder='Admin role' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='number' name='subscription' className='form-control input-lg' placeholder='Subscription' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='submit' value={buttonText} className='btn btn-primary btn-block btn-lg' />
        </div>
      </form >
    )
  }
}

export default RegisterForm
