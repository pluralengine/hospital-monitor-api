'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Scores', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'SET NULL',
    });
    await queryInterface.addColumn('Scores', 'HospitalId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Hospitals',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Scores', 'UserId');
    await queryInterface.removeColumn('Scores', 'HospitalId');
  },
};
