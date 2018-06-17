const express = require('express')
const app = express()
var users = require('./users.js')
var auth = require('./auth.js')
const cors = require('cors')
var books = require('./books.js')
// var shelves = require('./shelves.js')
// var subscriptions = require('./subscriptions.js')
const bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')

app.set('port', process.env.PORT || 3001)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}
function errorHandler (err, req, res, next) {
  var code = err.code
  var message = err.message
  res.writeHead(code, message, {'content-type': 'text/plain'})
  res.end(message)
}

app.use(errorHandler)
// ================authentication =================
app.post('/api/login', (req, res, next) => {
  auth.login(req.body).then((resp) => {
    res.send(resp)
  })
  .catch((error) => {
    var err = new Error('Password or username are invalid')
    err.code = 400
    return next(err)
  })
})

var adminRoute = function (req, res, next) {
  var token = req.headers['authorization']
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized'
    })
    // return next(); //if no token, continue
  } else {
    token = token.replace('Bearer ', '')
    jwt.verify(token, 'asd', function (err, user) {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        })
      } else {
        if (user.admin === 0) {
          return res.status(401).json({
            success: false,
            message: 'Unauthorized'
          })
        } else {
          req.user = user // set the user to req so other routes can use it
          next()
        }
      }
    })
  }
}

var userRoute = function (req, res, next) {
  var token = req.headers['authorization']
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized'
    })
    // return next(); //if no token, continue
  } else {
    token = token.replace('Bearer ', '')
    jwt.verify(token, 'asd', function (err, user) {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        })
      } else {
        req.user = user // set the user to req so other routes can use it
        next()
      }
    })
  }
}

// ================authentication =================

// users
app.get('/api/users', userRoute, (req, res) => {
  users.getUsers().then((resp) => {
    res.send(resp)
  })
})

app.get('/api/user/:id', (req, res) => {
  users.getUser(req.params.id).then((resp) => {
    res.send(resp)
  })
})

app.post('/api/user', (req, res) => {
  users.addUser(req.body).then((resp) => {
    res.send(resp)
  })
    .catch((error) => {
      res.send(error)
    })
})

app.post('/api/user/:id/subscribe/:subscriptionId', userRoute, (req, res) => {
  var data = {
    userId: req.params.id,
    subscriptionId: req.params.subscriptionId,
    payment: req.body
  }
  users.addUserSubscription(data).then((resp) => {
    res.send(resp)
  })
})

app.delete('/api/borrow/book/:bookId/user/:userId', adminRoute, (req, res) => {
  books.returnBook(req.params.userId, req.params.bookId).then((resp) => {
    res.send(resp)
  })
})

app.put('/api/user/:id', userRoute, (req, res) => {
  console.log(req.body)
  var data = {
    id: req.params.id,
    data: req.body
  }
  users.updateUser(data).then((resp) => {
    res.send(resp)
  })
})

app.delete('/api/user/:id', adminRoute, (req, res) => {
  var id = req.params.id

  users.deleteUser(id).then((resp) => {
    res.send(resp)
  })
})

// books
app.get('/api/books', (req, res) => {
  books.getBooks(req.query).then((resp) => {
    res.send(resp)
  })
})

app.get('/api/book/:id', (req, res) => {
  books.getBook(req.params.id).then((resp) => {
    res.send(resp)
  })
  .catch((error) => {
    console.log('error', error)
  })
})

app.post('/api/book', adminRoute, (req, res) => {
  console.log(req.body)
  books.addBook(req.body).then((resp) => {
    res.send(resp)
  })
  .catch((error) => {
    console.log(error)
  })
})

app.put('/api/book/:id', adminRoute, (req, res) => {
  var data = {
    id: req.params.id,
    data: req.body
  }
  books.editBook(data).then((resp) => {
    res.send(resp)
  })
})

app.delete('/api/book/:id', adminRoute, (req, res) => {
  books.deleteBook(req.params.id).then((resp) => {
    res.send(resp)
  })
})

app.put('/api/borrow/book/:bookId/user/:userId', adminRoute, (req, res) => {
  books.borrowBook(req.params.bookId, req.params.userId).then((resp) => {
    res.send(resp)
  })
})

// ==========shelves=======
app.get('/api/shelves/', (req, res) => {
  shelves.getShelves(req.params.id).then((resp) => {
    res.send(resp)
  })
})

app.get('/api/shelf/:id', (req, res) => {
  shelves.getShelf(req.params.id).then((resp) => {
    res.send(resp)
  })
})

app.put('/api/shelf/:id', adminRoute, (req, res) => {
  var data = {
    id: req.params.id,
    data: req.body
  }
  shelves.editShelf(data).then((resp) => {
    res.send(resp)
  })
})

app.post('/api/shelf', adminRoute, (req, res) => {
  shelves.addShelf(req.body).then((resp) => {
    res.send(resp)
  })
})

app.delete('/api/shelf/:id', adminRoute, (req, res) => {
  shelves.deleteShelf(req.params.id).then((resp) => {
    res.send(resp)
  })
})
// ==========shelves=======

// =========subscriptions=======
app.get('/api/subscriptions/', (req, res) => {
  subscriptions.getSubscriptionPlans().then((resp) => {
    res.send(resp)
  })
})

app.get('/api/subscription/:id', (req, res) => {
  subscriptions.getSubscriptionPlan(req.params.id).then((resp) => {
    res.send(resp)
  })
})

app.put('/api/subscription/:id', adminRoute, (req, res) => {
  var data = {
    id: req.params.id,
    data: req.body
  }
  subscriptions.editSubscriptionPlan(data).then((resp) => {
    res.send(resp)
  })
})

app.post('/api/subscription', (req, res) => {
  subscriptions.addSubscriptionPlan(req.body).then((resp) => {
    res.send(resp)
  })
})

app.delete('/api/subscription/:id', adminRoute, (req, res) => {
  subscriptions.deleteSubscriptionPlan(req.params.id).then((resp) => {
    res.send(resp)
  })
})
// =========subscriptions=======

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`) // eslint-disable-line no-console
})
