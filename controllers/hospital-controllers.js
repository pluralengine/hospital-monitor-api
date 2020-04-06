const { Hospital } = require('../db/models');
const { findCoordinates, createCompatibleAddress } = require('./utils');

exports.getAllHospitals = function(req, res) {
  Hospital.findAll().then(hospitals => {
    try {
      res.json(hospitals);
    } catch (e) {
      console.error(`Error ${e} happened when trying to fetch hospitals`);
    }
  });
};

exports.createHospital = function(req, res) {
  Hospital.create({
    name: req.body.name,
    address: req.body.address,
    phonenum: req.body.phonenum,
    areas: req.body.areas,
    provinces: req.body.provinces,
    regionsccaa: req.body.regionsccaa,
    postcode: req.body.postcode,
    bednum: req.body.bednum,
    type: req.body.type,
    type_of_dependency: req.body.typeofdependency,
    func_dependency: req.body.funcdependency,
    email: req.body.email,
    hospitalId: req.body.hospitalid,
    status: req.body.status,
  }).then(async function(hospital) {
    const coord = await findCoordinates(createCompatibleAddress(hospital));
    hospital
      .update({ geometry_lat: coord.lat, geometry_lng: coord.lng })
      .then(hospital => {
        try {
          res.status(201);
          res.json(hospital);
        } catch (e) {
          res.status(400);
          e.message = `Error happened when trying to create a new hospital. \n ${e.message}`;
          
          throw e;
        }
      });
  });
};

exports.findHospitalById = function(req, res) {
  const id = req.params.id;
  Hospital.findByPk(id).then(hospital => {
    try {
      res.status(200);
      res.json(hospital);
    } catch (e) {
      console.error(
        `Error ${e} happened when trying to find hospital by ${id}`
      );
    }
  });
};
