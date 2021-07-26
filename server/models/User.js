export default (sequelize, DataTypes) => {
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
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    plan: {
      type: DataTypes.STRING,
      defaultValue: 'Silver'
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isAdmin: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
