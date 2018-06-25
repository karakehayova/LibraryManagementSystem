import React from 'react'
import { loginUser } from '../requests'

export class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        username: '',
        password: ''
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
      let fields = Object.assign({}, this.state.user)
      fields[name] = value
      this.setState({
        user: fields
      })
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    loginUser(this.state.user).then(
      (user) => {
        if (user.error) {
          this.setState({ error: user.error })
        } else {
          this.setState({ error: '' })
        }
      }
    )
      .catch((error) => {
        console.log('error', error)
      })
  }

  render () {
    let error = this.state.error ? <div className='alert alert-danger' role='alert'>
      {this.state.error} </div> : ''
    let form = <form onSubmit={this.handleSubmit}>
      <div className='form-group'>
        <label>Username</label>
        <input type='text' className='form-control' value={this.state.user.username} name='username' required onChange={this.handleChange} />
      </div>

      <div className='form-group'>
        <label>Password</label>
        <input type='password' className='form-control' value={this.state.user.password} name='password' required onChange={this.handleChange} />
      </div>

      <button type='submit' className='btn btn-warning'>Submit</button>

    </form>

    return <div>
      {error}
      {form}
    </div>
  }
}
export default LoginForm
