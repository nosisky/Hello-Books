'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    UserId: DataTypes.STRING,
    Type: {
      type: DataTypes.ENUM('rented', 'returned'),
      required: true,
    },
    BookName: {
      type: DataTypes.STRING,
      required: true
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.RentedBooks, {
          foreignKey: 'UserId'
        })
      }
    }
  });
  return History;
};