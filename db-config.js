const pg = require('pg');
if (process.env.NODE_ENV === 'production') {
  pg.defaults.ssl = true;
} else {
  pg.defaults.ssl = false;
}
const Sequelize = require('sequelize');

let [dbUser, dbPwd, host, port, dbName] = ['', '', '', '', ''];

if (process.env.NODE_ENV === 'production') {
  dbUser = process.env.DB_USER;
  dbPwd = process.env.DB_PW;
  host = process.env.HOST;
  port = process.env.DB_PORT;
  dbName = process.env.DB_NAME;
} else {
  dbUser = process.env.DB_USER_DEV;
  dbPwd = process.env.DB_PWD_DEV;
  host = process.env.HOST_DEV;
  port = process.env.DB_PORT_DEV;
  dbName = process.env.DB_NAME_DEV;
}

const sequelize = new Sequelize(
  `postgres://${dbUser}:${dbPwd}@${host}:${port}/${dbName}`
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection with db has been established successfully. 👍');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  Sequelize,
  sequelize,
};
