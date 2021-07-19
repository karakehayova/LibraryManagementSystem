import React, { useState, useEffect } from 'react'
import { loginUser } from '../requests'

export default function LoginForm() {

  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    if (e) {
      const target = e.target
      const value = target ? target.value : e.value
      const name = target ? target.name : ''
      let fields = Object.assign({}, user)
      fields[name] = value
      setUser(fields)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    loginUser(user).then(
      (result) => {
        if (result.error) {
          setError(result.error)
        } else {
          setError('')
        }
      }
    )
      .catch((error) => {
        console.log('error', error)
      })
  }

  let renderError = error ? <div className='alert alert-danger' role='alert'>
    {error} </div> : ''
  let form = <form onSubmit={handleSubmit}>
    <div className='form-group'>
      <label>Username</label>
      <input type='text' className='form-control' value={user.username} name='username' required onChange={handleChange} />
    </div>

    <div className='form-group'>
      <label>Password</label>
      <input type='password' className='form-control' value={user.password} name='password' required onChange={handleChange} />
    </div>

    <button type='submit' className='btn btn-warning'>Submit</button>

  </form>

  return <div>
    {renderError}
    {form}
  </div>
}
