const User = require('../models/index').User;

exports.getAllUsers = function(req, res) {
  User.findAll().then(users => {
    try {
      res.json(users);
    } catch (e) {
      console.error(`Error ${e} happened when trying to fetch users`);
    }
  });
};

exports.createUser = function(req, res) {
  User.create({
    name: req.body.name,
    email: req.body.address,
    password: req.body.phonenum,
    hospitalid: req.body.areas, //TODO handle the case when the hospital is not in the list
    role: req.body.provinces,
  }).then(function(user) {
    try {
      res.status(201);
      res.json(`User ${user.userid} was created`);
    } catch (e) {
      res.status(400);
      console.error(`Error ${e} happened when trying to create a new hospital`);
    }
  });
};

exports.findUserById = function(req, res) {
  const id = req.params.id;
  User.findByPk(id).then(user => {
    try {
      res.status(200);
      res.json(`User ${user.userid} was found`);
    } catch (e) {
      console.error(`Error ${e} happened when trying to find User by ${id}`);
    }
  });
};
