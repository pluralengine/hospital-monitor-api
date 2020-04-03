'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define(
    'Hospital',
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNum: DataTypes.STRING,
      areas: DataTypes.STRING,
      provinces: DataTypes.STRING,
      regionsCcaa: DataTypes.STRING,
      postcode: DataTypes.INTEGER,
      bedNum: DataTypes.INTEGER,
      type: DataTypes.STRING,
      dependencyType: DataTypes.STRING,
      funcDependency: DataTypes.STRING,
      email: DataTypes.STRING,
      geometryLat: DataTypes.STRING,
      geometryLng: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {}
  );
  Hospital.associate = function(models) {
    Hospital.hasMany(models.user);
  };
  return Hospital;
};
