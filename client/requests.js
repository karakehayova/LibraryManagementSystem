/* eslint-disable no-undef */
var axios = require('axios')
var basePath = 'http://localhost:3001'
var qs = require('qs')
var passwordHash = require('password-hash')
var auth = require('./auth')

function getUserByID (id) {
  return axios.get(basePath + '/api/user/' + id)
    .then(function (response) {
      auth.checkResponse(response)
      return response.data
    })
    .catch(function (error) {
      window.location = 'http://localhost:3000' + '/'
    })
}

function borrowBook (userID, bookID) {
  return axios.put(basePath + '/api/borrow/book/' + bookID + '/user/' + userID)
    .then(function (response) {
      auth.checkResponse(response)
      return response.data
    })
    .catch(function (error) {
      console.log('error', error)
    })
}

function returnBook (userID, bookID) {
  return axios.delete(basePath + '/api/borrow/book/' + bookID + '/user/' + userID)
    .then(function (response) {
      auth.checkResponse(response)
      return response.data
    })
    .catch(function (error) {
      return error
    })
}

function deleteBook (id) {
  return axios.delete(basePath + '/api/book/' + id)
    .then(function (response) {
    })
    .catch(function (error) {
      return 'Book cannot be deleted.'
    })
}

function getUsers () {
  return axios.get(basePath + '/api/users')
    .then(function (response) {
      auth.checkResponse(response)
      return response.data
    })
    .catch(function (error) {
      return error
    })
}

function loginUser (data) {
  return axios.post(basePath + '/api/login', qs.stringify(data))
    .then(function (response) {
      localStorage.setItem('token', response.data.token)
      let user = {
        username: response.data.user.username,
        name: response.data.user.first_name + response.data.user.last_name,
        email: response.data.user.email,
        admin: response.data.user.admin,
        id: response.data.user.id
      }
      localStorage.setItem('user', JSON.stringify(user))
      if (user.admin) {
        window.location = 'http://localhost:3000' + '/admin'
      } else {
        window.location = 'http://localhost:3000' + '/info'
      }
    })
    .catch(function (error) {
      return { error: 'Username or password are invalid' }
    })
}

function getBooks () {
  return axios.get(basePath + '/api/books')
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

function getBookById (id) {
  return axios.get(basePath + '/api/book/' + id)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

function postUser (data) {
  return axios.post(basePath + '/api/user', qs.stringify(data))
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
}

function updateUser (data) {
  return axios.put(basePath + '/api/user/' + data.id, qs.stringify(data))
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return error
  })
}

function postBook (data) {
  return axios.post(basePath + '/api/book', qs.stringify(data))
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
      window.location = basePath + '/'
    })
}

function editBook (data) {
  return axios.put(basePath + '/api/book/' + data.id, qs.stringify(data))
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

function updatePassword (userId, newPass) {
  if (!passwordHash.verify(newPass.oldPass, newPass.current)) {
    return new Promise((resolve, reject) => {
      reject({error: 'Old password is wrong!'})
    })
  }
  if (newPass.newPass !== newPass.repeatPass) {
    return new Promise((resolve, reject) => {
      reject({error: 'Password don`t match'})
    })
  }
  let updateData = {password: newPass.newPass}
  return axios.put(basePath + '/api/user/' + userId, qs.stringify(updateData))
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

function likeBook (bookId, userId) {
  return axios.post(basePath + '/api/' + bookId + '/' + userId)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    console.log(error)
    return error
  })
}

function dislikeBook (bookId, userId) {
  return axios.delete(basePath + '/api/' + bookId + '/' + userId)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    console.log(error)
    return error
  })
}

module.exports = {
  getUsers: getUsers,
  getBooks: getBooks,
  getBookById: getBookById,
  postBook: postBook,
  editBook: editBook,
  postUser: postUser,
  updateUser: updateUser,
  loginUser: loginUser,
  getUserByID: getUserByID,
  borrowBook: borrowBook,
  returnBook: returnBook,
  deleteBook: deleteBook,
  likeBook: likeBook,
  dislikeBook: dislikeBook,
  updatePassword: updatePassword
}
