module.exports = (sequelize, Sequelize) => sequelize.define('user_subscriptions', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  subscription_id: {
    type: Sequelize.INTEGER
  },
  start_date: {
    type: Sequelize.DATE,
  },
  end_date: {
    type: Sequelize.DATE,
  },
}, {
  timestamps: false,
});
