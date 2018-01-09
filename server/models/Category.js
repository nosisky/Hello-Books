export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Category.BelongsTo(models.Book, {
          foreignKey: 'categoryId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Category;
};
