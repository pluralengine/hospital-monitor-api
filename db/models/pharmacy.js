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
    },
    {}
  );

  Pharmacy.associate = function (models) {
    Pharmacy.belongsTo(models.User);
    Pharmacy.belongsToMany(models.Product, {
      through: 'PharmacyProduct',
      as: 'products',
      foreignKey: 'PharmacyId',
      otherKey: 'ProductId',
    });
  };

  return Pharmacy;
};
