const Hospital = require('../models/index').Hospital;
const { findCoordinates } = require('./utils');

exports.getAllHospitals = function(req, res) {
  Hospital.findAll().then(hospitals => res.json(hospitals));
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
    typeofdependency: req.body.typeofdependency,
    funcdependency: req.body.funcdependency,
    email: req.body.email,
    hospitalid: req.body.hospitalid,
    status: req.body.status,
  }).then(async function(hospital) {
    const coord = await utils.findCoordinates(hospital.address);
    hospital.update({ geometry_lat: coord.lat, geometry_lng: coord.lng });
  });
};

exports.findHospitalById = function(req, res) {
  Hospital.findByPk(req.params.id).then(result => res.json(result));
};

exports.changeStatus = async function(req, res) {
  const id = req.params.id;
  Hospital.update(
    {
      status: req.body.status,
    },
    { where: { id: id } }
  ).then(instance => res.json(instance));
};
