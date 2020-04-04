const pg = require('pg');
const Sequelize = require('sequelize');
const config = require('./config');

if (process.env.NODE_ENV === 'production') {
  pg.defaults.ssl = true;
} else {
  pg.defaults.ssl = false;
}

const { username, password, database, host, dialect } =
  config[process.env.NODE_ENV] || {};
const dbUrl = `${dialect}://${username}:${password}@${host}:5432/${database}`;


module.exports = {
  init: function () {
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
