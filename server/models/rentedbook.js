module.exports = (sequelize, DataTypes) => {
  const RentedBook = sequelize.define('RentedBook', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    toReturnDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    returned: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        RentedBook.BelongsTo(models.Book, {
          foreignKey: 'bookId',
          onDelete: 'CASCADE'
        });
        RentedBook.BelongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return RentedBook;
};
