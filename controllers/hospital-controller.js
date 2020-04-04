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
          const message = e.message;
          console.error(
            `Error ${e} happened when trying to create a new hospital`
          );
          throw new Error(
            `Error ${message} happened when trying to create a new hospital.`
          );
        }
      });
  });
};

exports.findHospitalById = function(req, res) {
  const id = req.params.id;
  Hospital.findByPk(id).then(result => {
    try {
      res.status(200);
      res.json(result);
    } catch (e) {
      console.error(
        `Error ${e} happened when trying to find hospital by ${id}`
      );
    }
  });
};

exports.changeStatus = async function(req, res) {
  const hospitalId = req.params.id;
  const score = req.query.score;
  const userid = req.query.userid;
  Score.create({
    score: score,
    UserId: userid,
    HospitalId: hospitalId,
  }).then(score => {
    try {
      res.status(200);
      res.json(score);
    } catch {
      res.status(400);
      const message = e.message;
      console.error(`Error ${e} happened when trying to create a new hospital`);
      throw new Error(
        `Error ${message} happened when trying to send a new hospital status.`
      );
    }
  });
};
