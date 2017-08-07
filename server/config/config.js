import dotenv from 'dotenv';

dotenv.load();


export default {
  development: {
    use_env_variable: process.env.DATABASE_URL
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
