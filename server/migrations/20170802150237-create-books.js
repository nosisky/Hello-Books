module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isbn: {
      type: Sequelize.TEXT,
      required: true
    },
    catId: {
      type: Sequelize.INTEGER,
      required: true
    },
    prodYear: {
      type: Sequelize.STRING
    },
    cover: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Books')
};
