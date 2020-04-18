'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('PharmacyProducts', 'stock');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('PharmacyProducts', 'stock', {
      type: Sequelize.BOOLEAN,
    });
  },
};
