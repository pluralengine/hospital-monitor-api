const Sequelize = require('../db-config').Sequelize;
const sequelize = require('../db-config').sequelize;

// MODEL IMPORTS
const HospitalModel = require('./hospital-model');
const UserModel = require('./user-model');

// MODELS
const Hospital = HospitalModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize, Hospital);

// ASSOCIATIONS

Hospital.hasMany(User, { as: 'Users' });

// MODULES
module.exports = {
  Hospital,
};
