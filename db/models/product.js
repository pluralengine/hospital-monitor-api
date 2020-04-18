'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {}
  );
  Product.associate = function (models) {
    Product.belongsToMany(models.Pharmacy, {
      through: 'PharmacyProduct',
      foreignKey: 'ProductId',
      otherKey: 'PharmacyId',
    });
  };
  return Product;
};
