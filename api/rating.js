var sqlite3 = require('sqlite3').verbose()
var dbUtils = require('./dbUtils')
var db = new sqlite3.Database('./library.db')

function like (book, user) {
  return new Promise((resolve, reject) => {
    let ratingData = {
      book_id: book,
      user_id: user
    }
    db.serialize(function () {
      let { query, params } = dbUtils.insert('rating', ratingData)
      db.run(query, params, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  })
}

function dislike (bookId, userId) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let query = dbUtils.deleteByUserBookIds('rating', bookId, userId)
      db.run(query, [], (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  })
}

function getRating (bookId) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let query = dbUtils.getByBookId('rating', bookId)
      db.all(query, (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  })
}

module.exports = {
  like: like,
  dislike: dislike,
  getRating: getRating
}
