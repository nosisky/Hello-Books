'use strict';
module.exports = function(sequelize, DataTypes) {
  var RentedBooks = sequelize.define('RentedBooks', {
    BookId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    toReturnDate: DataTypes.DATE,
    ReturnDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return RentedBooks;
};