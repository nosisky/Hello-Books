module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    FullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Username: {
      type: DataTypes.STRING,
      unique: true
    },
    Password: DataTypes.STRING,
    Email: {
      type: DataTypes.STRING,
      unique: true
    },
    Plan: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Users.hasMany(models.RentedBooks, {
          foreignKey: 'UserId'
        });
      }
    }
  });
  return Users;
};
