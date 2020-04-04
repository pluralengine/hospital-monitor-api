var parseDbUrl = require('parse-database-url');
var envDbConfig = process.env.DATABASE_URL
  ? parseDbUrl(process.env.DATABASE_URL)
  : {};

console.log(envDbConfig);
module.exports = {
  development: {
    username: envDbConfig.dialect || 'medrank',
    password: envDbConfig.password || null,
    database: envDbConfig.database || 'hospital-monitor',
    host: envDbConfig.host || 'localhost',
    dialect: envDbConfig.dialect || 'postgres',
  },
  test: {
    username: envDbConfig.user || process.env.DB_USER,
    password: envDbConfig.password || process.env.DB_PWD,
    database: envDbConfig.database || process.env.DB_NAME,
    host: envDbConfig.host || process.env.HOST,
    dialect: envDbConfig.dialect || 'postgres',
  },
  production: {
    username: envDbConfig.user || process.env.DB_USER,
    password: envDbConfig.password || process.env.DB_PWD,
    database: envDbConfig.database || process.env.DB_NAME,
    host: envDbConfig.host || process.env.HOST,
    dialect: envDbConfig.dialect || 'postgres',
  },
};
