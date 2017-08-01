'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    Author: DataTypes.STRING,
    Description: {
      type:DataTypes.TEXT,
      required: true,
    },
    Name: {
        type: DataTypes.STRING
    },
    ISBN: {
        type: DataTypes.TEXT
    },
    Cover: {
        type: DataTypes.STRING
    },
    ProdYear: {
        type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Books.hasMany(models.RentedBooks, {
          foreignKey: 'BookId'
        })
      }
    }
  });
  return Books;
};