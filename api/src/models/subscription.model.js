module.exports = (sequelize, Sequelize) => sequelize.define('subscriptions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    duration_months: {
      type: Sequelize.INTEGER,
    }
  }, {
    timestamps: false,
  });
  