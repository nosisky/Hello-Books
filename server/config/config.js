import dotenv from 'dotenv';

dotenv.load();

export default {
  development: {
    username: 'andeladeveloper',
    password: '',
    database: 'hellobooks',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'DATABASE_TEST_URL',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
