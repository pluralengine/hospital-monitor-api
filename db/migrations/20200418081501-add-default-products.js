'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Mascarilla',
        photo: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Desinfectante de manos',
        photo: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Guantes de látex',
        photo: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', {});
  },
};
