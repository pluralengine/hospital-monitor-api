const provinces = require('../mocks/provinces');

exports.getProvinces = function (req, res) {
  try {
    res.status(200);
    res.json(provinces);
  } catch (e) {
    console.error(`Error ${e} happened when trying to fetch provinces`);
  }
};
