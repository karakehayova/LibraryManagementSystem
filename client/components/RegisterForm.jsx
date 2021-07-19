import React, { useState, useEffect } from 'react'
import { postUser, getUserByID, updateUser } from '../requests'
import { useParams } from 'react-router-dom'

export default function RegisterForm() {
  const { id } = useParams()
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    email: '',
    admin: false,
    subscription: 1
  })
  const [error, setError] = useState('')
  const [userState, setUserState] = useState({
    added: false,
    updated: false
  })

  useEffect(() => {
    if (id) {
      getUserByID(id)
        .then((response) => {
          setUserData(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, []);

  function handleInputChange(e) {
    const target = e.target
    let value = target.value
    const name = target.name
    if(name === 'admin' && target.checked !== undefined){
      value = target.checked
    }
    let data = Object.assign({}, userData)
    data[name] = value
    setUserData(data)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!id) {
      postUser(userData)
        .then((response) => {
          if (response.errno) {
            setError('This username or email are already taken.')
          } else if (response.err) {
            setError(response.err)
          } else {
            setUserState({ added: response })
            setError('')
          }
        })
        .catch((error) => {
          console.log('err', error)
        })
    } else {
      let updateData = userData
      delete updateData.books
      delete updateData.start_date
      updateUser(updateData)
        .then((response) => {
          setUserState({ updated: response })
          setError('')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  if (userState.added) {
    return <div class='alert alert-success' role='alert'> The user was successfully registered.</div>
  }
  if (userState.updated) {
    return <div class='alert alert-success' role='alert'> The user was successfully updated.</div>
  }
  let renderError = error ? <div className='alert alert-danger' role='alert'>
    {error} </div> : null

  let buttonText = id ? 'Update' : 'Register'
  return (
    <form onSubmit={handleSubmit} role='form' style={{ "max-width": "50%" }}>
      <h2>{buttonText}</h2>
      {renderError}
      <div className='form-group'>
        <input onChange={handleInputChange} type='text' value={userData.first_name} name='first_name' className='form-control input-lg' placeholder='First Name' />
      </div>
      <div className='form-group'>
        <input onChange={handleInputChange} type='text' value={userData.last_name} name='last_name' className='form-control input-lg' placeholder='Last Name' />
      </div>
      <div className='form-group'>
        <input onChange={handleInputChange} type='text' value={userData.username} name='username' className='form-control input-lg' placeholder='Username' />
      </div>
      <div className='form-group'>
        <input onChange={handleInputChange} type='email' value={userData.email} name='email' className='form-control input-lg' placeholder='Email Address' />
      </div>
      <div className='form-group'>
        <input onChange={handleInputChange} type='password' name='password' className='form-control input-lg' placeholder='Password' />
      </div>
      <div className='form-group'>
        <input onChange={handleInputChange} type='password' name='password_confirmation' className='form-control input-lg' placeholder='Confirm Password' />
      </div>
      <div className='form-group'>
        <span>Admin role</span>
        <input onChange={handleInputChange} checked={userData.admin} type='checkbox' name='admin' className='form-control input-lg' placeholder='Admin role' />
      </div>
      <div className='form-group'>
        <input onChange={handleInputChange} type='number' name='subscription' className='form-control input-lg' placeholder='Subscription' />
      </div>
      <div className='form-group'>
        <input onChange={handleInputChange} type='submit' value={buttonText} className='btn btn-primary btn-block btn-lg' />
      </div>
    </form >
  )
}

