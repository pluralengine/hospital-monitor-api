'use strict';
const { Pharmacy } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pharmacies = await Pharmacy.findAll();
    const pharmacyUsers = getUsersFromPharmacies(pharmacies);
    const users = pharmacyUsers.map(pharmacyUser =>
      queryInterface.bulkInsert('Users', [pharmacyUser]).catch(row => {
        console.error(`Error creating user with name: "${pharmacyUser.name}"`);
        console.error(row);
      })
    );
    return Promise.all(users);
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

function getUsersFromPharmacies(pharmacies) {
  return pharmacies.map(pharmacy => {
    return {
      name: pharmacy.name,
      email: pharmacy.email,
      password: pharmacy.centerCode,
      HospitalId: null,
      role: 'Pharmacy Owner',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
}
