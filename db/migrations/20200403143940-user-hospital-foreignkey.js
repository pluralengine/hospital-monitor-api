'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'hospitalId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Hospitals',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'SET NULL',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'hospitalId');
  },
};
