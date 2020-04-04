module.exports = {
  development: {
    username: 'medrank',
    password: null,
    database: 'hospital-monitor',
    host: 'localhost',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: 'postgres',
  },
};
