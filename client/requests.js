/* eslint-disable no-undef */
import axios from 'axios'
import passwordHash from 'password-hash'
import auth from './auth'
import jwt from 'jsonwebtoken'
const basePath = 'http://localhost:3001/api'

function getUserByID(id) {
  return axios.get(`${basePath}/user/${id}`)
    .then(function (response) {
      auth.checkResponse(response)
      return response.data
    })
    .catch(function (error) {
      window.location = 'http://localhost:3000' + '/'
    })
}

function borrowBook(userID, bookID) {
  return axios.post(`${basePath}/user/${userID}/book/${bookID}/borrow`)
    .then(function (response) {
      auth.checkResponse(response)
      return response.data
    })
    .catch(function (error) {
      console.log('error', error)
    })
}

function returnBook(userID, bookID) {
  return axios.post(`${basePath}/user/${userID}/book/${bookID}/return`)
    .then(function (response) {
      auth.checkResponse(response)
      return response.data
    })
    .catch(function (error) {
      return error
    })
}

function deleteBook(id) {
  return axios.delete(`${basePath}/book/id`)
    .then(function (response) {
    })
    .catch(function (error) {
      return 'Book cannot be deleted.'
    })
}

function getUsers() {
  return axios.get(`${basePath}/users`)
    .then(function (response) {
      auth.checkResponse(response)
      return response.data
    })
    .catch(function (error) {
      return error
    })
}

function loginUser(data) {
  console.log(data)
  return axios.post(`${basePath}/login`, data)
    .then(function (response) {
      const user = jwt.verify(response.data.access_token, 'J1vO0dwYPuyGeAnt35yzefnOhgRHRKfw');
      localStorage.setItem('token', response.data.access_token)
      localStorage.setItem('user', JSON.stringify({
        ...user,
        ...{ name: `${user.first_name} ${user.last_name}` }
      }))
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

function getBooks() {
  return axios.get(`${basePath}/books`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

function getBookById(id) {
  return axios.get(`${basePath}/book/${id}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

function postUser(data) {
  return axios.post(`${basePath}/register`, data)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
}

function updateUser(data) {
  return axios.put(`${basePath}/user/${data.id}`, data)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
}

function postBook(data) {
  return axios.post(`${basePath}/book`, data)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
      window.location = basePath + '/'
    })
}

function editBook(data) {
  return axios.put(`${basePath}/book/${data.id}`, data)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

function updatePassword(userId, newPass) {
  if (!passwordHash.verify(newPass.oldPass, newPass.current)) {
    return new Promise((resolve, reject) => {
      reject({ error: 'Old password is wrong!' })
    })
  }
  if (newPass.newPass !== newPass.repeatPass) {
    return new Promise((resolve, reject) => {
      reject({ error: 'Password don`t match' })
    })
  }
  let updateData = { password: newPass.newPass }
  return axios.put(basePath + '/user/' + userId, updateData)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

function likeBook(bookId, userId) {
  return axios.post(`${basePath}/user/${userId}/book/${bookId}/like`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
      return error
    })
}

function dislikeBook(bookId, userId) {
  return axios.post(`${basePath}/user/${userId}/book/${bookId}/dislike`)
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
