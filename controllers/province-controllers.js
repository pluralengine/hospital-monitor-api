const provinces = require('../mocks/provinces');
const { Pharmacy } = require('../db/models');

exports.getProvinces = function (req, res) {
  try {
    res.status(200);
    res.json(provinces);
  } catch (e) {
    console.error(`Error ${e} happened when trying to fetch provinces`);
  }
};

exports.getAreas = async function (req, res) {
  try {
    const areas = await Pharmacy.findAll({ attributes: ['areas'] });
    const uniqueAreas = [...new Set(areas.map(area => area.areas))].sort();
    console.log(uniqueAreas[0]);
    res.status(200);
    res.json(uniqueAreas);
  } catch (e) {
    res.status(500);
    res.json({ error: `${e} happened while fetching areas` });
  }
};
