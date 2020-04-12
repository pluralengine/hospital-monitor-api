const { User } = require('../db/models');

exports.createUser = function (req, res) {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    HospitalId: req.body.hospitalId,
    role: req.body.role,
  }).then(user => {
    res.status(201);
    res.json({ ...user.toJSON(), password: undefined });
  });
};

exports.findUserById = function (req, res) {
  const id = req.params.id;
  User.findByPk(id).then(user => {
    res.status(200);
    res.json(user);
  });
};
