'use strict';
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define(
    'Score',
    {
      rate: DataTypes.INTEGER,
    },
    {}
  );
  Score.associate = function(models) {
    Score.belongsTo(models.Hospital);
    Score.belongsTo(models.User);
  };
  return Score;
};
