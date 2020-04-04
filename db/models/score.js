'use strict';
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    rate: DataTypes.INTEGER
  }, {});
  return Score;
};
