const { User, Pharmacy, PharmacyProduct, Product } = require('../db/models');

exports.getAllPharmacies = async function (req, res) {
  const pharmacies = await Pharmacy.findAll({
    where: { ...req.query },
    include: {
      model: Product,
      as: 'products',
      attributes: ['id', 'name'],
      through: {
        model: PharmacyProduct,
        attributes: [],
      },
    },
    attributes: [
      'id',
      'name',
      'address',
      'phoneNum',
      'areas',
      'geometryLat',
      'geometryLng',
    ],
  });
  res.json(pharmacies);
};

exports.updateUserPharmacyStock = async function (req, res) {
  const { productId, stock } = req.body;
  const { email } = req.user;
  try {
    const user = await User.findOne({ where: { email } });
    const pharmacy = await Pharmacy.findOne({
      where: { UserId: user.id },
    });
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(400);
      res.json({ error: `The product with id ${productId} does not exist` });
      return;
    }

    if (stock) {
      await pharmacy.removeProduct(product);
    } else {
      await pharmacy.addProduct(product);
    }

    await pharmacy.changed('updatedAt', true);
    await pharmacy.save();

    res.json(
      await Pharmacy.findByPk(pharmacy.id, {
        include: [
          {
            model: Product,
            as: 'products',
            attributes: ['id', 'name'],
            through: {
              model: PharmacyProduct,
              attributes: [],
            },
          },
        ],
      })
    );
  } catch (e) {
    res.status(500);
    res.json({
      error: String(e),
    });
  }
};

exports.getPharmacyById = async function (req, res) {
  const { id } = req.params;

  try {
    const returnedPharmacy = await Pharmacy.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['id', 'name'],
          through: {
            model: PharmacyProduct,
            attributes: [],
          },
        },
      ],
    });

    if (!returnedPharmacy) {
      res.status(400);
      res.json({ error: `The pharmacy with id ${id} does not exist` });
      return;
    }

    res.status(200);
    res.json(returnedPharmacy);
  } catch (e) {
    res.status(500);
    res.json({ error: `${e}` });
  }
};

exports.getUsersPharmacy = async function (req, res) {
  const { email } = req.user;
  const user = await User.findOne({ where: { email } });

  const pharmacy = await Pharmacy.findOne({
    where: { UserId: user.id },
  });

  if (!pharmacy) {
    res.status(500);
    const errorMessage = `The user ${JSON.stringify(
      user.toJSON(),
      null,
      2
    )} doesn't have a pharmacy attached`;

    res.status(500);
    res.json({ error: errorMessage });
    res.send();

    throw Error(
      `The user ${JSON.stringify(
        user.toJSON(),
        null,
        2
      )} doesn't have a pharmacy attached`
    );
  }

  res.status(200);
  res.json(
    await Pharmacy.findByPk(pharmacy.id, {
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['id', 'name'],
          through: {
            model: PharmacyProduct,
            attributes: [],
          },
        },
      ],
    })
  );
};
