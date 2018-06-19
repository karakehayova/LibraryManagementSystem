import React, { Component } from 'react'
import { loginUser, postUser } from '../requests'

export class RegisterForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        admin: 0,
        subscription: 1
      },
      error: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.login = this.login.bind(this)
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
    postUser(this.state.data)
			.then((response) => {
  if (response.errno) {
    this.setState({ error: 'This username or email are already taken.' })
  } else {
    if (this.state.error) {
      this.setState({ error: '' })
    }
  }
})
  }

  login (event) {
    window.location = '/'
  }

  render () {
    let error = this.state.error ? <div className='alert alert-danger' role='alert'>
      {this.state.error} </div> : ''
    return (
      <form onSubmit={this.handleSubmit} role='form'>
        <h2>Register</h2>
        {error}
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='text' name='first_name' className='form-control input-lg' placeholder='First Name' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='text' name='last_name' className='form-control input-lg' placeholder='Last Name' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='text' name='username' className='form-control input-lg' placeholder='Username' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='email' name='email' className='form-control input-lg' placeholder='Email Address' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='password' name='password' className='form-control input-lg' placeholder='Password' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='password' name='password_confirmation' className='form-control input-lg' placeholder='Confirm Password' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='text' name='admin' className='form-control input-lg' placeholder='Admin role' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='number' name='subscription' className='form-control input-lg' placeholder='Subscription' />
        </div>
        <div className='form-group'>
          <input onChange={this.handleInputChange} type='submit' value='Register' className='btn btn-primary btn-block btn-lg' />
        </div>
        <a onClick={this.login} className='btn btn-success btn-block btn-lg'>
					Login
        </a>
      </form >
    )
  }
}

export default RegisterForm
