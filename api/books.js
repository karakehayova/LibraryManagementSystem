module.exports = {
	getBooks: getBooks,
	borrowBook: borrowBook
}
var sqlite3 = require('sqlite3').verbose()
var _ = require('lodash')
var utils = require('./utility')
var db = new sqlite3.Database('./library.db')
var dbUtils = require('./dbUtils')

function getBooks () {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let stmt = `SELECT * from books`
      db.all(stmt, [], (err, rows) => {
				console.log(rows)
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  })
}

function borrowBook(bookId, userId) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      getBook(bookId).then((book) => {
        // resolve(book)
        if (book !== undefined && book.length !== 0) {
          if (book[0].borrowed == 0) {
            let { query, params } = dbUtils.update('books', book[0].id, { 'borrowed': 1 })

            db.run(query, params, (err) => {
              if (err) {
                reject(err)
              }
            })

            let now = new Date();
            let returnDate = new Date();
            returnDate.setMonth(now.getMonth() + 1);

            var data = {
              user_id: userId,
              book_id: bookId,
              borrow_date: utils.formatDate(now),
              return_date: utils.formatDate(returnDate),
              returned: 0
            }

            var bezDeklaraciqNaTaziPromenlivaDolniqRedSeChupi;

            ({ query, params } = dbUtils.insert('user_books', data));
            db.run(query, params, (err) => {
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
          resolve('No such book')
        }
      })
    })
  })
}