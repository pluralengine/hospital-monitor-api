const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PWD}@localhost:5432/medrank`
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
