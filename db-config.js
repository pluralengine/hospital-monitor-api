const pg = require('pg');
pg.defaults.ssl = true;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}
`
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
