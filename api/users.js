var sqlite3 = require('sqlite3').verbose()
var dbUtils = require('./util')
var db = new sqlite3.Database('./library.db')
var utils = require('./utility')
var passwordHash = require('password-hash')

function getUsers () {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let stmt = `SELECT * from users`
      db.all(stmt, [], (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  })
}

function getUserByUsername (username) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let stmt = 'SELECT * from users WHERE username = "' + `${username}` + '"'
      db.all(stmt, [], (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  })
}

function getUser (userId) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let query = dbUtils.getById('users', userId)

      db.all(query, [userId], (errUser, user) => {
        if (errUser) {
          reject(errUser)
        } else {
          let queryBooks = dbUtils.getBooksForUser(userId)
          db.all(queryBooks, [], (errBooks, books) => {
            if (errBooks) {
              reject(errBooks)
            } else {
              user[0].books = books
              resolve(user)
            }
          })
        }
      })
    })
  })
}

function addUser (userData) {
  return new Promise((resolve, reject) => {
    if (userData.password !== userData.password_confirmation) {
      reject('The password and password confirmation are different!')
    }
    var hashedPassword = passwordHash.generate(userData.password)
    userData.password = hashedPassword
    delete userData.password_confirmation
    db.serialize(function () {
      let { query, params } = dbUtils.insert('users', userData)
      db.run(query, params, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve('User successfully added.')
        }
      })
    })
  })
}

function updateUser (userData) {
  if (userData.data.password) {
    if (userData.data.password_confirmation) {
      if (userData.password !== userData.password_confirmation) {
        reject('The password and password confirmation are different!')
      }
      delete userData.data.password_confirmation
    }
    let hashedPassword = passwordHash.generate(userData.data.password)
    userData.data.password = hashedPassword
  }
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let { query, params } = dbUtils.update('users', userData.id, userData.data)

      db.run(query, params, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve('User successfully updated.')
        }
      })
    })
  })
}

function deleteUser (id) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let query = dbUtils.deleteById('users', id)
      db.run(query, [], (err) => {
        if (err) {
          reject(err)
        } else {
          resolve('User successfully deleted.')
        }
      })
    })
  })
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getUserByUsername: getUserByUsername
}
