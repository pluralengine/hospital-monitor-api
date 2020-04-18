'use strict';
module.exports = (sequelize, DataTypes) => {
  const PharmacyProduct = sequelize.define(
    'PharmacyProduct',
    {
      PharmacyId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
    },
    {}
  );
  PharmacyProduct.associate = function (models) {
    // associations can be defined here
  };
  return PharmacyProduct;
};
