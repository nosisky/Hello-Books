module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: DataTypes.FALSE,
      unique: false
    },
    isbn: {
      type: DataTypes.TEXT,
      required: true
    },
    prodYear: DataTypes.STRING,
    catId: DataTypes.INTEGER,
    cover: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Books.hasMany(models.RentedBook, {
          foreignKey: 'bookId'
        });
        Books.hasOne(models.Category, {
          foreignKey: 'catId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Books;
};
