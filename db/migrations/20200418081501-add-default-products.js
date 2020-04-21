'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Mascarilla',
        photo: 'mask',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Desinfectante de manos',
        photo: 'handSanitizer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Guantes de látex',
        photo: 'gloves',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', {});
  },
};
