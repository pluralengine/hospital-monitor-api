'use strict';
const fs = require('fs');
const Client = require('@googlemaps/google-maps-services-js').Client;
const client = new Client({});
const path = require('path');
const fileData = path.resolve(
  __dirname,
  '../default-data/pharmacies-data.json'
);
const targetFile = path.resolve(
  __dirname,
  '../default-data/pharmacies-data-with-coord.json'
);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let pharmaciesData;
    try {
      console.log('fileData :', fileData);
      pharmaciesData = JSON.parse(fs.readFileSync(fileData));
    } catch (e) {
      console.error(`Error happened while fetching local data`);
      throw e;
    }

    pharmaciesData = pharmaciesData.slice(0, 1);

    for (let i = 0; i < pharmaciesData.length; i++) {
      console.log(`${i}/${pharmaciesData.length}`);
      const pharmacyData = pharmaciesData[i];

      try {
        if (!pharmacyData.geodata || !pharmacyData.geodata.length) {
          const response = await client.geocode({
            params: {
              address: `${pharmacyData.viaType} ${pharmacyData.address} ${pharmacyData.addressNumber}, ${pharmacyData.areas}`,
              //TODO: remove key and add an env variable
              key: process.env.GOOGLE_KEY,
            },
            timeout: 2000, // milliseconds
          });

          if (!response.data.results.length) {
            throw new Error(JSON.stringify(response.data, null, 2));
          }

          pharmacyData.geodata = response.data.results;

          fs.writeFileSync(targetFile, JSON.stringify(pharmaciesData, null, 2));
        }
      } catch (e) {
        console.error(
          `Error while fetching data for ${pharmacyData.normalizedCenterCode}`,
          e
        );
      }
    }
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
