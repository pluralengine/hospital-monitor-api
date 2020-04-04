'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'HospitalId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Hospitals',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'SET NULL',
    });
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'HospitalId');
    await queryInterface.removeColumn('Users', 'password');
  },
};
