import dotenv from 'dotenv';

dotenv.load();


export default {
  development: {
    use_env_variable: process.env.DATABASE_URL
  },
  test: {
    username: 'postgres',
    password: 'dealwap',
    database: 'hellobooks',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: '1337'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
