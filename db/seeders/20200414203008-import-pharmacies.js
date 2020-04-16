'use strict';
const fs = require('fs');
const { Pharmacy } = require('../models');
const path = require('path');
const DATA_FILE = path.resolve(
  __dirname,
  '../default-data/pharmacies-with-coord-data.json'
);
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let pharmaciesData;
    try {
      pharmaciesData = JSON.parse(fs.readFileSync(DATA_FILE));
    } catch (e) {
      console.error(`Error happened while fetching local data`);
      throw e;
    }

    console.log(`Serializing ${pharmaciesData.length}...`);
    const validData = pharmaciesData.filter(
      d => Array.isArray(d.geodata) && d.geodata.length > 0
    );
    console.log(`${validData.length}/${pharmaciesData.length} has a valid format`);
    const pharmacies = validData.map(serialize);
    console.log(
      'Pharmacies has been serialized with this format:',
      pharmacies[0]
    );
    const buckets = chunk(pharmacies, 100);
    console.log(`They have been split in  ${buckets.length} chucks`);

    const promises = buckets.map((data, idx) => {
      console.log(`${idx + 1}/${buckets.length} queued`);
      return Pharmacy.bulkCreate(data)
        .then(() => {
          console.log(`Bucket ${idx + 1}/${buckets.length} completed!`);
        })
        .catch(e => {
          console.error('Error creating pharmacies for bucked', idx);
          console.error(e);
        });
    });

    await Promise.all(promises);
    console.log(
      `[SUCCESS] ${validData.length}/${pharmaciesData.length} pharmacies has been imported!\n${pharmaciesData.length - validData.length} pharmacies has been skipped since they don't have coordinates location`
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};

function chunk(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

function serialize(data) {
  let location;
  try {
    location =
      data.geodata && data.geodata[0] && data.geodata[0].geometry.location;
    return {
      name: data.name,
      centerCode: String(data.centerCode),
      address: `${data.viaType} ${data.address} ${data.addressNumber}`,
      phoneNum: String(data.phoneNum),
      areas: data.areas,
      provinces: data.provinces,
      regionsCcaa: data.regionsCcaa,
      postcode: data.postcode,
      email: data.email,
      geometryLat: String(location.lat),
      geometryLng: String(location.lng),
    };
  } catch (e) {
    console.log(data.geodata);
    throw e;
  }
}
