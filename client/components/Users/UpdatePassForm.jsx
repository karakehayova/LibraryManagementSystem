import React from 'react'
import { updatePassword, getUserByID } from '../../requests'
import history from '../../history'

export class UpdatePassForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      passwords: {
        oldPass: '',
        newPass: '',
        repeatPass: '',
        current: ''
      },
      id: '',
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (prevState.id !== nextProps.match.params.id) {
      return { id: nextProps.match.params.id }
    }
    return null
  }

  componentDidMount () {
    if (this.state.id) {
      getUserByID(this.state.id)
				.then((response) => {
  this.setState({ passwords: Object.assign(this.state.passwords, {current: response[0].password })})
})
				.catch((error) => {
  console.log(error)
})
    }
  }

  handleChange (e) {
    if (e) {
      const target = e.target
      const value = target ? target.value : e.value
      const name = target ? target.name : ''
      let fields = Object.assign({}, this.state.passwords)
      fields[name] = value
      this.setState({
        passwords: fields
      })
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    updatePassword(this.state.id, this.state.passwords).then(
			(user) => {
  if (user) {
    history.push('/info')
  }
}
		)
			.catch((error) => {
  console.log(error)
})
  }

  render () {
    let error = this.state.error ? <div className='alert alert-danger' role='alert'>
      {this.state.error} </div> : ''
    let form = <form onSubmit={this.handleSubmit}>
      <div className='form-group'>
        <label>Old Password</label>
        <input type='password' className='form-control' value={this.state.passwords.oldPass} name='oldPass' required onChange={this.handleChange} />
      </div>

      <div className='form-group'>
        <label>New Password</label>
        <input type='password' className='form-control' value={this.state.passwords.newPass} name='newPass' required onChange={this.handleChange} />
      </div>

      <div className='form-group'>
        <label>Password Confirmation</label>
        <input type='password' className='form-control' value={this.state.passwords.repeatPass} name='repeatPass' required onChange={this.handleChange} />
      </div>

      <button type='submit' className='btn btn-warning'>Submit</button>

    </form>

    return <div>
      {error}
      {form}
    </div>
  }
}
export default UpdatePassForm
