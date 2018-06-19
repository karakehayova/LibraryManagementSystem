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
      let stmt = 'SELECT * from users WHERE username = ' + 'username'
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
              // let queryUserSubscription = dbUtils.getUserSubscription(userId)

              // db.all(queryUserSubscription, [], (errSubscription, subscription) => {
              //   if (errSubscription) {
              //     reject(errSubscription)
              //   } else {
              user[0].books = books
              // user[0].subscription = subscription
              resolve(user)
            }
            // })
            // }
          })
        }
      })
    })
  })
}

function addUser (userData) {
  return new Promise((resolve, reject) => {
    var hashedPassword = passwordHash.generate(userData.password)
    userData.password = hashedPassword
    delete userData.password_confirmation
    // delete userData.password_confirm
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

function addUserSubscription (data) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      getSubscription(data.subscriptionId).then((subscription) => {
        getUserActiveSubscription(data.userId).then((userSubscription) => {
          if (userSubscription !== undefined && userSubscription.length !== 0) {
            resolve('You have active subscription')
          } else {
            if (subscription[0].price == data.payment.amount_payed) {
              let currentDate = new Date()
              let endSubscriptionDate = new Date()

              let subscriptionEndMonth = currentDate.getMonth() + subscription[0].duration_months
              let addYear = 0

              if (subscriptionEndMonth > 12) {
                subscriptionEndMonth = subscriptionEndMonth - 12
                addYear = 1
              }

              endSubscriptionDate.setMonth(subscriptionEndMonth)
              endSubscriptionDate.setFullYear(currentDate.getFullYear() + addYear)

              insertData = {
                user_id: data.userId,
                subscription_id: data.subscriptionId,
                start_date: utils.formatDate(currentDate),
                end_date: utils.formatDate(endSubscriptionDate)
              }

              let { query, params } = dbUtils.insert('user_subscription', insertData)
              db.run(query, params, (err) => {
                if (err) {
                  reject(err)
                } else {
                  resolve('Subscription successfully made.')
                }
              })
            } else if (subscription[0].price > data.payment.amount_payed) {
              resolve('Insufficient funds')
            } else {
              resolve('You are trying to pay more than needed')
            }
          }
        })
      })
    })
  })
}

function getUserActiveSubscription (userId) {
  return new Promise((resolve, reject) => {
    let query = dbUtils.getUserActiveSubscription(userId)

    db.all(query, [], (err, userSubscription) => {
      if (err) {
        reject(err)
      } else {
        resolve(userSubscription)
      }
    })
  })
}

function getSubscription (id) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let query = dbUtils.getSubscription(id)

      db.all(query, [], (errSubscription, subscription) => {
        if (errSubscription) {
          reject(errSubscription)
        } else {
          resolve(subscription)
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
  addUserSubscription: addUserSubscription,
  getUserByUsername: getUserByUsername
}
