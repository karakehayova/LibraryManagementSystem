module.exports = (sequelize, Sequelize) => sequelize.define('user_books', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
  book_id: {
    type: Sequelize.INTEGER,
  },
  borrow_date: {
    type: Sequelize.DATE,
  },
  return_date: {
    type: Sequelize.DATE,
  },
}, {
  timestamps: false,
});
