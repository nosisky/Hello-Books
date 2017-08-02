'use strict';
module.exports = function(sequelize, DataTypes) {
  var Books = sequelize.define('Books', {
    Title: DataTypes.STRING,
    allowNull: DataTypes.FALSE,
    unique: DataTypes.FALSE,
    Isbn: DataTypes.TEXT,
    required: DataTypes.TRUE,
    ProdYear: DataTypes.STRING,
    cover: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Books;
};