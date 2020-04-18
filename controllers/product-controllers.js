const { Product } = require('../db/models');

exports.getAllProducts = async function (req, res) {
  try {
    const products = await Product.findAll();
    res.status(200);
    res.json(products);
  } catch (e) {
    res.status(500);
    res.json({ error: `${e} occurred while retrieving products` });
  }
};
