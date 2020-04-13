'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pharmacy = sequelize.define(
    'Pharmacy',
    {
      name: DataTypes.STRING,
      centerCode: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNum: DataTypes.STRING,
      areas: DataTypes.STRING,
      provinces: DataTypes.STRING,
      regionsCcaa: DataTypes.STRING,
      postcode: DataTypes.INTEGER,
      email: DataTypes.STRING,
      geometryLat: DataTypes.STRING,
      geometryLng: DataTypes.STRING,
      pharmacyId: DataTypes.INTEGER
    },
    {}
  );
  Pharmacy.associate = function (models) {
    Pharmacy.hasOne(models.User);
    Pharmacy.belongsToMany(models.Product, { through: 'PharmacyProduct' });
  };
  return Pharmacy;
};