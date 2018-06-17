/* eslint-disable no-undef */
var axios = require('axios')
var basePath = 'http://localhost:3001'
var qs = require('qs')

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
      // window.location = 'http://localhost:3000' + '/admin'
    })
}

function returnBook (userID, bookID) {
  return axios.delete(basePath + '/api/borrow/book/' + bookID + '/user/' + userID)
    .then(function (response) {
      auth.checkResponse(response)
      return response.data
    })
    .catch(function (error) {
      window.location = 'http://localhost:3000' + '/admin'
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
      window.location = 'http://localhost:3000' + '/'
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
  return axios.get(basePath + '/api/books/' + id)
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
      // window.location = basePath + '/register'
      return error
    })
}

function postBook (data) {
  return axios.post(basePath + '/api/user', qs.stringify(data))
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      window.location = basePath + '/'
    })
}

module.exports = {
  getUsers: getUsers,
  getBooks: getBooks,
  getBookById: getBookById,
  postBook: postBook,
  postUser: postUser,
  loginUser: loginUser,
  getUserByID: getUserByID,
  borrowBook: borrowBook,
  returnBook: returnBook,
  deleteBook: deleteBook
}
