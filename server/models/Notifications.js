export default (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notification', {
    userId: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Notifications.BelongsTo(models.User, {
          foreignKey: 'UserId'
        });
      }
    }
  });
  return Notifications;
};
