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
    username: envDbConfig.user || 'medrank',
    password: envDbConfig.password || null,
    database: envDbConfig.database || 'hospital-monitor-test',
    host: envDbConfig.host || 'localhost',
    dialect: envDbConfig.driver || 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
