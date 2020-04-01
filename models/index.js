const Sequelize = require('../db-config').Sequelize;
const sequelize = require('../db-config').sequelize;

// MODEL IMPORTS
const HospitalModel = require('./hospital-model');

// MODELS
const Hospital = HospitalModel(sequelize, Sequelize);

// MODULES
module.exports = {
  Hospital,
};
