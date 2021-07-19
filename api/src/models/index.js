import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `${__dirname}/../../database.sqlite3`,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model')(sequelize, Sequelize);
db.books = require('./book.model')(sequelize, Sequelize);
db.user_books = require('./user_book.model')(sequelize, Sequelize);
db.subscriptions = require('./subscription.model')(sequelize, Sequelize);
db.user_subscriptions = require('./user_subscription.model')(sequelize, Sequelize);
db.books_likes_dislikes = require('./book_likes_dislikes.model')(sequelize, Sequelize);

db.users.hasMany(db.user_books, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'user_books',
});
db.books.hasOne(db.user_books, {
  sourceKey: 'id',
  foreignKey: 'book_id',
  as: 'books',
});

db.user_books.belongsTo(db.users, {
  foreignKey: 'user_id',
  as: 'user',
});

db.user_books.belongsTo(db.books, {
  foreignKey: 'book_id',
  as: 'books',
});

db.books.hasMany(db.books_likes_dislikes, {
  sourceKey: 'id',
  foreignKey: 'book_id',
  as: 'books_likes_dislikes',
});

db.books_likes_dislikes.belongsTo(db.books, {
  foreignKey: 'book_id',
  as: 'books_likes_dislikes',
});

db.users.hasOne(db.user_subscriptions, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'subscriptions',
});

db.user_subscriptions.belongsTo(db.users, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'subscriptions',
});

module.exports = db;
