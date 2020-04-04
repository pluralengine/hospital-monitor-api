const pg = require('pg');
const Sequelize = require('sequelize');
const config = require('./config');

if (process.env.NODE_ENV === 'production') {
  pg.defaults.ssl = true;
} else {
  pg.defaults.ssl = false;
}

module.exports = {
  init: function () {
    const env = process.env.NODE_ENV || 'development';
    const { username, password, database, host, dialect } = config[env] || {};
    const dbUrl =
      process.env.DATABASE_URL ||
      `${dialect}://${username}:${password}@${host}:5432/${database}`;

    console.log(`Connecting to ${dbUrl}...`);
    const sequelize = new Sequelize(dbUrl);

    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection with db has been established successfully. 👍');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });

    return sequelize;
  },
};
