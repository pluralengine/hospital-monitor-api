'use strict';
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    rate: DataTypes.INTEGER
  }, {});
  Score.associate = function(models) {
    // associations can be defined here
  };
  return Score;
};