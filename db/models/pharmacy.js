'use strict';
const { PharmacyProduct } = require('./index');
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
    Pharmacy.belongsToMany(models.Product, { through: 'PharmacyProduct' });
  };

  Pharmacy.prototype.updateStock = async function (productId, stock = true) {
    const pharmacyId = this.id;
    PharmacyProduct.findAll({ where: { pharmacyId, productId } }).then(
      pharmacyProducts => {
        if (!pharmacyProducts.length) {
          PharmacyProduct.create({
            PharmacyId,
            ProductId,
            stock,
          });
        } else {
          pharmacyProducts.update({ stock });
        }
      }
    );
  };

  return Pharmacy;
};
