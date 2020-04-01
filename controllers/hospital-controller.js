const Hospital = require('../models/index').Hospital;

exports.getAllHospitals = async function(req, res) {
  Hospital.findAll().then(hospitals => res.json(hospitals));
};
