module.exports = {
  development: {
    username: 'medrank',
    password: null,
    database: 'hospital-monitor',
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
  },
  test: {
    username: 'medrank-test',
    password: null,
    database: 'hospital-monitor-test',
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: 'postgres',
    operatorsAliases: false,
  },
};
