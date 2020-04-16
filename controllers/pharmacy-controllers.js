const { User, Pharmacy, PharmacyProduct } = require('../db/models');

exports.getAllPharmacies = function (req, res) {
  Pharmacy.findAll().then(pharmacies => {
    try {
      res.json(pharmacies);
    } catch (e) {
      console.error(`Error ${e} happened when trying to fetch pharmacies`);
    }
  });
};


exports.updatePharmacyStock = async function (req, res) {
  const { productId, stock } = req.body;
  const { email } =  req.user
  const user = await User.findOne({ where: { email } });
  const pharmacy = await Pharmacy.findOne({ where: { UserId: user.id } });
  const pharmacyProductStockFindings = await PharmacyProduct.findOrCreate({
    where: { ProductId: productId, PharmacyId: pharmacy.id },
  });
  const pharmacyProductStock = pharmacyProductStockFindings[0];
  pharmacyProductStock.stock = stock;
  await pharmacyProductStock.save();
  const availableProducts = await PharmacyProduct.findAll({
    where: { ProductId: productId, PharmacyId: pharmacy.id, stock: true },
  });

  res.json({
    ...pharmacy.toJSON(),
    products: availableProducts.map(stock => stock.ProductId),
  });
};
