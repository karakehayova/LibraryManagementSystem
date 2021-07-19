import express from 'express';
import compression from 'compression';
import { } from 'dotenv/config';
import cors from 'cors';
import { adminRoute, userRoute } from './auth';

import * as authController from './controllers/auth';
import * as usersController from './controllers/users';
import * as booksController from './controllers/books';
import * as subscriptionsController from './controllers/subscriptions';


/**
 * Express configuration.
 */
const app = express();

const corsOptions = {
  origin: process.env.FRONT_END_URI,
};

app.use(cors(corsOptions));

app.set('port', process.env.PORT || 3001);
app.use(compression());
app.use(express.json());

// Adding /api as a prefix to all routes
const router = express.Router();
app.use('/api', router);

/**
 * Creates tables if they don't exist, however it is probably better to handle this with a migration
 */

const db = require('./models');

db.sequelize.sync();

/**
 * Routes.
 */
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/users', userRoute, usersController.getUsers);
router.get('/user/:userId', userRoute, usersController.getUser);
router.put('/user/:userId', adminRoute, usersController.updateUser);
router.delete('/user/:userId', adminRoute, usersController.deleteUser);

router.get('/books', userRoute, booksController.getBooks);
router.get('/book/:bookId', userRoute, booksController.getBook);
router.post('/book', adminRoute, booksController.saveBook);
router.put('/book/:bookId', adminRoute, booksController.updateBook);
router.delete('/book/:bookId', adminRoute, booksController.deleteBook);
router.post('/user/:userId/book/:bookId/like', userRoute, booksController.likeBook);
router.post('/user/:userId/book/:bookId/dislike', userRoute, booksController.dislikeBook);

router.post('/user/:userId/book/:bookId/borrow', userRoute, booksController.borrowBook);
router.post('/user/:userId/book/:bookId/return', userRoute, booksController.returnBook);
router.delete('/user/:userId/book/:bookId/rating', userRoute, booksController.resetBookRating);

router.post('/subscription', userRoute, subscriptionsController.saveSubscription);
router.get('/subscriptions', userRoute, subscriptionsController.listSubscriptions);
router.post('/user/:userId/subscription/:subscriptionId/subscribe', userRoute, subscriptionsController.subscribeUser);

export default app;
