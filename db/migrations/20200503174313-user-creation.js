'use strict';
const { Pharmacy, User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pharmacies = await Pharmacy.findAll();
    return Promise.all(generateUsersFromPharmacies(pharmacies));
  },

  down: async (queryInterface, Sequelize) => {
    const pharmacies = await Pharmacy.findAll();
    const pharmacyUsers = getUsersFromPharmacies(pharmacies);
    return queryInterface.bulkDelete(
      'Users',
      {
        name: {
          [Sequelize.Op.in]: pharmacyUsers.map(
            pharmacyUser => pharmacyUser.name
          ),
        },
      },
      {}
    );
  },
};

function generateUsersFromPharmacies(pharmacies) {
  return pharmacies.map(async pharmacy => {
    if (pharmacy.email && pharmacy.email.length > 0) {
      const user = await User.create({
        name: pharmacy.name,
        email: pharmacy.email.toLowerCase(),
        password: pharmacy.centerCode,
        HospitalId: null,
        role: 'Autogenerated Pharmacy Owner',
      });
      pharmacy.UserId = user.id;
      await pharmacy.save();
    }
  });
}

function getUsersFromPharmacies(pharmacies) {
  return pharmacies.map(pharmacy => {
    return { name: pharmacy.name };
  });
}