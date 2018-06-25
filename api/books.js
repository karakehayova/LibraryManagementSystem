var sqlite3 = require('sqlite3').verbose()
var dbUtils = require('./dbUtils')
var users = require('./users')
var rating = require('./rating')
var utils = require('./utils')
var db = new sqlite3.Database('./library.db')

function getBooks (condition) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let query = dbUtils.getBooks(condition)

      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  })
}

function getBook (id) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let query = dbUtils.getBooks({}, id)

      db.all(query, [], (err, book) => {
        if (err) {
          reject(err)
        }
        if (book !== undefined && book.length !== 0) {
          if (!book[0].user_id) {
            book[0].likes = []
            resolve(book)
          } else {
            users.getUser(book[0].user_id).then((user) => {
              rating.getRating(book[0].id).then((rows) => {
                book[0].likes = rows
                book[0].user = user
                resolve(book)
              })
            })
          }
        } else {
          reject('No such book')
        }
      })
    })
  })
}

function addBook (bookData) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let { query, params } = dbUtils.insert('books', bookData)
      db.run(query, params, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve('Book successfully added.')
        }
      })
    })
  })
}

function editBook (data) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let { query, params } = dbUtils.update('books', data.id, data.data)

      db.run(query, params, (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  })
}

function deleteBook (id) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let query = dbUtils.deleteById('books', id)

      db.run(query, [], (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve('Book successfully deleted.')
      })
    })
  })
}

function borrowBook (bookId, userId) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      getBook(bookId).then((book) => {
        // resolve(book)
        if (book !== undefined && book.length !== 0) {
          if (book[0].borrowed === 0) {
            let { query, params } = dbUtils.update('books', book[0].id, { 'borrowed': 1 })

            db.run(query, params, (err) => {
              if (err) {
                reject(err)
              }
            })

            let now = new Date()
            let returnDate = new Date()
            returnDate.setMonth(now.getMonth() + 1)

            var data = {
              user_id: userId,
              book_id: bookId,
              borrow_date: utils.formatDate(now),
              return_date: utils.formatDate(returnDate),
              returned: 0
            }

            let userBooksData = dbUtils.insert('user_books', data)
            db.run(userBooksData.query, userBooksData.params, (err) => {
              if (err) {
                reject(err)
              } else {
                resolve('Book successfully borrowed.')
              }
            })
          } else {
            resolve('Book already borrowed')
          }
        } else {
          reject('No such book')
        }
      })
    })
  })
}

function returnBook (userId, bookId) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let { query, params } = dbUtils.update('books', bookId, { 'borrowed': 0 })

      db.run(query, params, (err) => {
        if (err) {
          reject(err)
        }
      })

      query = dbUtils.deleteWhere('user_books', { user_id: userId, book_id: bookId })

      db.run(query, [], (err) => {
        if (err) {
          reject(err)
        } else {
          resolve('Book successfully returned.')
        }
      })
    })
  })
}

module.exports = {
  getBooks: getBooks,
  getBook: getBook,
  addBook: addBook,
  editBook: editBook,
  deleteBook: deleteBook,
  borrowBook: borrowBook,
  returnBook: returnBook
}
