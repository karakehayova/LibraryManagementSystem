module.exports = (sequelize, Sequelize) => sequelize.define('books', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
  },
  author: {
    type: Sequelize.STRING,
  },
  subject: {
    type: Sequelize.STRING,
  },
  genre: {
    type: Sequelize.STRING,
  },
  publisher: {
    type: Sequelize.STRING,
  },
  edition: {
    type: Sequelize.INTEGER,
  },
  borrowed: {
    type: Sequelize.BOOLEAN,
  },
  shelf_id: {
    type: Sequelize.INTEGER,
  },
  row: {
    type: Sequelize.INTEGER,
  },
  column: {
    type: Sequelize.INTEGER,
  },
  url: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.INTEGER,
  },
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
  underscored: true,
  uniqueKeys: {
    Items_unique: {
      fields: ['name', 'edition'],
    },
  },
});
