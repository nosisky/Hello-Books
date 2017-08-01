'use strict';
module.exports = (sequelize, DataTypes) => {
  const RentedBooks = sequelize.define('RentedBooks', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    UserId: DataTypes.INTEGER,
    BookId: {
      type: DataTypes.INTEGER,
      required: true,
      unique: true
    },
    ToRentedDate: DataTypes.DATE,
    ReTurnDate: DataTypes.DATE
  }, {
  });
  return RentedBooks;
};