'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          const hash = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
          this.setDataValue('password', hash);
        },
      },
    },
    {
      instanceMethods: {
        validPassword: async function(password) {
          return await bcrypt.compare(password, this.password);
        },
      },
    }
  );
  User.associate = function(models) {
    User.belongsTo(models.Hospital);
    User.hasMany(models.Score);
  };
  return User;
};
