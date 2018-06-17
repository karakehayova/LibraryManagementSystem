// Generate Token using secret from process.env.JWT_SECRET
var jwt = require('jsonwebtoken')
var users = require('./users.js')
var passwordHash = require('password-hash')

var sqlite3 = require('sqlite3').verbose()
var dbUtils = require('./util')
var db = new sqlite3.Database('./library.db')
function generateToken (user) {
  // 1. Dont use password and other sensitive fields
  // 2. Use fields that are useful in other parts of the
  // app/collections/models
  var u = {
    name: user.name,
    username: user.username,
    admin: user.admin,
    _id: user.id.toString()
  }
  return token = jwt.sign(u, 'asd', {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  })
}

function login (data) {
  return new Promise((resolve, reject) => {
    users.getUserByUsername(data.username).then((user) => {
      if (user && user[0] && user[0].password) {
        if (passwordHash.verify(data.password, user[0].password)) {
          var token = generateToken(user[0])
          resolve({ user: user[0], token: token })
        } else {
          reject({ error: true, message: 'Invalid username or password' })
        }
      }
    })
    .catch((error) => {
      reject({error: true, message: 'Invalid username or password'})
    })
  })
}

// has to be a middleware for all routes
function authenticatedPage (request) {
  return new Promise((resolve, reject) => {
    var token = request.body.token || request.query.token
    if (!token) {
      return res.status(401).json({ message: 'Must pass token' })
    }
  })
}

module.exports = {
  login: login,
  authenticatedPage: authenticatedPage
}
