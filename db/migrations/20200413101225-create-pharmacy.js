'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pharmacies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      centerCode: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phoneNum: {
        type: Sequelize.STRING
      },
      areas: {
        type: Sequelize.STRING
      },
      provinces: {
        type: Sequelize.STRING
      },
      regionsCcaa: {
        type: Sequelize.STRING
      },
      postcode: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      geometryLat: {
        type: Sequelize.STRING
      },
      geometryLng: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Pharmacies');
  }
};