'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PharmacyProducts', {
      PharmacyId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      ProductId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      stock: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PharmacyProducts');
  }
};