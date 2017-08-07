export default (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    type: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        History.BelongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return History;
};
