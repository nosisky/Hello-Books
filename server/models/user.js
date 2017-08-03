module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    isBanned: {
      type: DataTypes.STRING,
      defaultValue: 0
    },
    plan: {
      type: DataTypes.STRING,
      defaultValue: 'silver'
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        User.hasMany(models.RentedBooks, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return User;
};
