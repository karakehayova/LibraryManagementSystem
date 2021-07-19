module.exports = (sequelize, Sequelize) => sequelize.define('books_likes_dislikes', {
  // id: {
  //   allowNull: false,
  //   autoIncrement: true,
  //   primaryKey: true,
  //   type: Sequelize.INTEGER,
  // },
  book_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  action: {
    type: Sequelize.STRING,
  },
}, {
  timestamps: false,
});
