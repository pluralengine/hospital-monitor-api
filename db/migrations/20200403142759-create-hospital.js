'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Hospitals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
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
      bedNum: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      dependencyType: {
        type: Sequelize.STRING
      },
      funcDependency: {
        type: Sequelize.STRING
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
      status: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Hospitals');
  }
};