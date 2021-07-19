module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ratings', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      book_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ratings');
  },
};
