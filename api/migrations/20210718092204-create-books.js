module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
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
        type: Sequelize.INTEGER,
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }, {
      uniqueKeys: {
        Items_unique: {
          fields: ['name', 'edition'],
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books');
  },
};
