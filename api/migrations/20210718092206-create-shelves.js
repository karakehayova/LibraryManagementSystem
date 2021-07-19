module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shelves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rows: {
        type: Sequelize.INTEGER,
      },
      columns: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('shelves');
  },
};
