module.exports = {
  insert: insert,
  deleteById: deleteById,
  deleteAll: deleteAll,
  getById: getById,
  update: update,
  selectWhere: selectWhere,
  getBooks: getBooks,
  getUser: getUser,
  getBooksForUser: getBooksForUser,
  getUserSubscription: getUserSubscription,
  getSubscription: getSubscription,
  getUserActiveSubscription: getUserActiveSubscription,
  getSubscriptionPlans: getSubscriptionPlans,
  borrowBook: borrowBook,
  returnBook: returnBook,
  checkBookStatus: checkBookStatus,
  deleteWhere: deleteWhere
}
var _ = require('lodash')
var utils = require('./utility')

function insert (tableName, data) {
  var params = []
  var query = 'INSERT INTO ' + tableName + ' ('
  Object.keys(data).forEach(function (key) {
    query += key + ', '
    params.push(data[key])
  })

  query = query.slice(0, -2)
  query += ') VALUES ('

  for (var i = 0; i < params.length; i++) {
    query += '?, '
  }

  query = query.slice(0, -2)
  query += ')'
  return {
    query: query,
    params: params
  }
}

function deleteById (tableName, id) {
  var query = 'DELETE FROM ' + tableName + ' WHERE ID = ' + id
  return query
}

function deleteAll (tableName) {
  var query = 'DELETE FROM ' + tableName
  return query
}

function getById (tableName, id) {
  var query = 'SELECT * FROM ' + tableName + ' WHERE ID = ?'
  return query
}

function update (tableName, id, data) {
  for (var key in data) {
    if (typeof data[key] === 'undefined' || data[key] === null) {
      delete data[key]
    }
  }
  var query = ' UPDATE ' + tableName + ' SET '
  if (_.has(data, 'id')) {
    delete data.id
  }
  var keys = Object.keys(data)
  var params = _.values(data)
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] !== 'id') {
      query += keys[i] + ' = ?, '
    }
  }
  query = query.slice(0, -2)
  query += ' WHERE id = ?'
  params.push(id)
  console.log(query)
  console.log(params)
  return {
    query: query,
    params: params
  }
}

function deleteWhere (tableName, conditions) {
  let query = 'DELETE FROM ' + tableName + ' WHERE '
  var count = 0

  _.forEach(conditions, function (value, key) {
    if (count > 0) {
      query += ' AND'
    }

    query += ' ' + key + ' = ' + value
    count++
  })

  return query
}

function selectWhere (tableName, conditions) {
  var query = 'SELECT * FROM ' + tableName

  if (!_.isEmpty(conditions)) {
    query += ' WHERE'
    var count = 0

    _.forEach(conditions, function (value, key) {
      if (count > 0) {
        query += ' AND'
      }

      query += ' ' + key + ' = ' + value
      count++
    })
  }

  console.log(query)

  return query
}

function getBooks (conditions, id = null) {
  let select = 'books.id, books.name, books.author, books.subject, books.genre, books.publisher, books.edition, books.borrowed, ' +
    'books.shelf_id, books.row, books.column, ' +
    'user_books.return_date, user_books.borrow_date, user_books.returned, user_books.user_id'

  let query = 'SELECT ' + select + ' FROM books ' +
    'LEFT JOIN user_books ' +
    'ON books.id = user_books.book_id '

  let textSearchFields = [
    'name',
    'author_name',
    'subject',
    'genre',
    'publisher'
  ]

  if (!_.isEmpty(conditions)) {
    query += ' WHERE'
    var count = 0

    _.forEach(conditions, function (value, key) {
      if (count > 0) {
        query += ' AND'
      }

      console.log(textSearchFields.indexOf(key))
      if (textSearchFields.indexOf(key) !== -1) {
        query += ' ' + key + ' LIKE "%' + value + '%"'
      } else {
        query += ' ' + key + ' = ' + (utils.isNumeric(value) ? value : '"' + value + '"')
      }

      count++
    })
  } else {
    if (id !== null) {
      query += ' WHERE books.id = ' + id
    }
  }

  return query
}

function getBooksForUser (id) {
  let select = 'books.id, books.name, books.author, books.subject, books.genre, books.publisher, books.edition, books.borrowed, ' +
    'books.shelf_id, books.row, books.column, ' +
    'user_books.return_date, user_books.borrow_date, user_books.returned'
  let query = 'SELECT ' + select + ' FROM books ' +
    'INNER JOIN user_books ' +
    'ON books.id = user_books.book_id ' +
    'WHERE user_books.user_id = ' + id

  return query
}

function getUser (id) {
  let select = 'users.id, users.username, users.first_name, users.last_name, users.email, users.admin, users.start_date, users.subscription, ' +
    'books.id as bookId, books.name, books.author, books.subject, books.genre, books.publisher, books.edition, books.borrowed, ' +
    'books.shelf_id, books.row, books.column, ' +
    'user_books.return_date, user_books.borrow_date, user_books.returned '

  let query = 'SELECT ' + select + ' FROM users ' +
    'INNER JOIN user_books ' +
    'ON users.id = user_books.user_id ' +
    'INNER JOIN books ' +
    'ON user_books.book_id = books.id ' +
    'WHERE users.id = ' + id

  return query
}

function getUserSubscription (id) {
  let query = 'SELECT * FROM user_subscription ' +
    'INNER JOIN subscriptions ' +
    'ON subscriptions.id = user_subscription.user_id ' +
    'WHERE user_subscription.user_id = ' + id

  return query
}

function getSubscription (id) {
  let query = 'SELECT * FROM subscriptions ' +
    'WHERE id = ' + id

  return query
}

function getUserActiveSubscription (userId) {
  let query = 'SELECT * FROM user_subscription WHERE user_id = ' + userId + ' AND end_date >= "' + utils.formatDate(new Date()) + '"'

  return query
}

function getSubscriptionPlans (id = null) {
  let query
  if (id) {
    query = 'SELECT * FROM subscriptions WHERE id = ' + id
  } else {
    query = 'SELECT * FROM subscriptions'
  }

  return query
}

function returnBook (bookId, userId) {
  let query = 'SELECT * FROM '
}

function borrowBook (bookId, userId) {
  let query = 'SELECT * FROM '
}

function checkBookStatus (bookId, status = 'borrowed') {
  let query = 'SELECT * FROM books WHERE borrowed = ' + (status === 'borrowed' ? 1 : 0) + ' AND id = ' + bookId

  return query
}
