import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import dbConfig from '../config/config';

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];
const db = {};
dotenv.load();
let sequelize;

if (env === 'development') {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
} else if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else if (process.env.DATABASE_TEST_URL) {
  sequelize = new Sequelize(process.env.DATABASE_TEST_URL);
}
fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize
      .import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object
  .keys(db)
  .forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
