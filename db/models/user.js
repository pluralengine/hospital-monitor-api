'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {}
  );
  User.associate = function(models) {
    User.belongsTo(models.hospital);
  };
  return User;
};
