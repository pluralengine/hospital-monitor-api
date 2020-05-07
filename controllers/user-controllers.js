const { User, Pharmacy } = require('../db/models');

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

exports.createPharmacyUser = async function (req, res) {
  const pharmacy = await Pharmacy.findByPk(req.body.pharmacyId);
  console.log('hear');

  if (!pharmacy) {
    res.status(400);
    res.json({
      error: `Pharmacy with id ${req.body.pharmacyId} does not exists`,
    });
    return;
  }

  if (pharmacy.UserId) {
    res.status(400);
    res.json({
      error: `La farmacia ya ha sido reclamada por otro usuario. Por favor, contacta con pluralengine@gmail.com.`,
    });
    return;
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    HospitalId: null,
    role: 'Pharmacy Owner',
  });

  pharmacy.UserId = user.id;
  await pharmacy.save();
  console.log('hear4');

  res.status(201);
  res.json({
    ...user.toJSON(),
    password: undefined,
    HospitalId: undefined,
    pharmacyId: pharmacy.id,
  });
};

exports.findUserById = function (req, res) {
  const id = req.params.id;
  User.findByPk(id).then(user => {
    res.status(200);
    res.json(user);
  });
};
