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
  const { email } = req.user;
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

exports.getPharmacyById = async function (req, res) {
  const { id } = req.params;
  let simplifiedPharmacy;
  Pharmacy.findAll({
    include: [{ Model: PharmacyProduct, as: 'products' }],
    where: {
      id,
    },
  }).then(pharmacy => {
    try {
      simplifiedPharmacy = {
        id: pharmacy.id,
        name: pharmacy.name,
        address: `${pharmacy.address}, ${pharmacy.areas}, ${pharmacy.provinces}`,
        products: pharmacy.products,
        geometryLng: pharmacy.geometryLng,
        geometryLat: pharmacy.geometryLat,
      };
      res.status(200);
      res.json(simplifiedPharmacy);
    } catch (e) {
      console.error(
        `Error ${e} happened when trying to find pharmacy by ${id}`
      );
    }
  });
};

/*
.then(() => {
      try {
        PharmacyProduct.findAll({
          where: {
            PharmacyId: id,
          },
        }).then(pharmacyProducts => {
          const stock = pharmacyProducts.map(product => {
            return {
              id: product.ProductId,
              name: 'mask',
              stock: product.stock,
            };
            //TODO return name of the product
          });
          simplifiedPharmacy.products = stock;
          res.status(200);
          res.json(simplifiedPharmacy);
        });
      } catch (e) {
        console.error(
          `Error ${e} happened when trying to find products for the pharmacy by ${id}`
        );
      }
    }); */
