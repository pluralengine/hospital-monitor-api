const { Pharmacy } = require('../db/models');

exports.getAllPharmacies = function(req, res) {
  Pharmacy.findAll().then(pharmacies => {
    try {
      res.json(pharmacies);
    } catch (e) {
      console.error(`Error ${e} happened when trying to fetch pharmacies`);
    }
  });
};
