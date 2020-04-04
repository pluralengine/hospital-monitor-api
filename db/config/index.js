var parseDbUrl = require('parse-database-url');
var envDbConfig = process.env.DATABASE_URL
  ? parseDbUrl(process.env.DATABASE_URL)
  : {};

module.exports = {
  development: {
    username: envDbConfig.user || 'medrank',
    password: envDbConfig.password || null,
    database: envDbConfig.database || 'hospital-monitor',
    host: envDbConfig.host || 'localhost',
    dialect: envDbConfig.driver || 'postgres',
  },
  test: {
    username: envDbConfig.user || process.env.DB_USER,
    password: envDbConfig.password || process.env.DB_PWD,
    database: envDbConfig.database || process.env.DB_NAME,
    host: envDbConfig.host || process.env.HOST,
    dialect: envDbConfig.driver || 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
