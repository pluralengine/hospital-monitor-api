const { User, Pharmacy, PharmacyProduct, Product } = require('../db/models');

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
    include: [{ model: Product }],
    where: {
      id,
    },
  }).then(pharmacy => {
    console.log(pharmacy);
    try {
      simplifiedPharmacy = {
        id: pharmacy[0].id,
        name: pharmacy[0].name,
        address: `${pharmacy[0].address}, ${pharmacy[0].areas}, ${pharmacy[0].provinces}`,
        products: pharmacy[0].Products,
        geometryLng: pharmacy[0].geometryLng,
        geometryLat: pharmacy[0].geometryLat,
        updatedAt: pharmacy[0].updatedAt,
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
