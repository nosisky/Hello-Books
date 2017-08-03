import dotenv from 'dotenv';

dotenv.load();


export default {
  development: {
    username: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.database,
    host: '127.0.0.1',
    dialect: 'postgres',
    port: '1337'
  },
  test: {
    username: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.database,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.database,
    host: '127.0.0.1',
    dialect: 'postgres',
    port: '5432'
  }
};
