module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('RentedBooks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    bookId: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    cover: {
      type: Sequelize.STRING
    },
    toReturnDate: {
      type: Sequelize.DATE
    },
    returnDate: {
      type: Sequelize.DATE
    },
    returned: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
  down: queryInterface => queryInterface.dropTable('RentedBooks')
};
