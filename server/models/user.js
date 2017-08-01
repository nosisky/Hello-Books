'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    FullName: DataTypes.STRING,
    Username: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    IsAdmin: {
      type: DataTypes.INTEGER,
    },
    Email: DataTypes.STRING,
    Password: DataTypes.TEXT,
    Plan: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.RentedBooks, {
          foreignKey: 'UserId'
        })
        User.hasMany(models.Notifications, {
          foreignKey: 'UserId'
        })
      }
    }
  });
  return User;
};