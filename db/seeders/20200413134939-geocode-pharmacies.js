'use strict';
const fs = require('fs');
const Client = require('@googlemaps/google-maps-services-js').Client;
const client = new Client({});
const path = require('path');
const targetFile = path.resolve(
  __dirname,
  '../default-data/pharmacies-data-with-coord.json'
);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let pharmaciesData;
    let processedCount = 0;
    try {
      pharmaciesData = JSON.parse(fs.readFileSync(targetFile));
    } catch (e) {
      console.error(`Error happened while fetching local data`);
      throw e;
    }

    const pharmaciesWithoutCoords = pharmaciesData.filter(
      p => !p.geodata || p.geodata.length === 0
    );

    console.log(
      `${pharmaciesWithoutCoords.length}/${pharmaciesData.length} will be processed`
    );

    for (let i = 0; i < pharmaciesData.length; i++) {
      const pharmacyData = pharmaciesData[i];

      try {
        if (!pharmacyData.geodata || pharmacyData.geodata.length === 0) {
          console.log(`${i}/${pharmaciesData.length}`);
          const response = await client.geocode({
            params: {
              address: `${pharmacyData.viaType} ${pharmacyData.address} ${pharmacyData.addressNumber}, ${pharmacyData.areas}`,
              //TODO: remove key and add an env variable
              key: 'AIzaSyAdwej3jU_EWwfRCFpHiKFuhw7wVFAvcCM',
            },
            timeout: 2000, // milliseconds
          });

          if (!response.data.results.length) {
            if (response.data.status === 'ZERO_RESULTS') {
              pharmacyData.geodata = 'ZERO_RESULTS';
              console.log('Zero results for', pharmacyData);
            } else {
              throw new Error(JSON.stringify(response.data, null, 2));
            }
          } else {
            pharmacyData.geodata = response.data.results;
          }

          ++processedCount;
          console.log('writting...');
          fs.writeFileSync(targetFile, JSON.stringify(pharmaciesData, null, 2));
        }
      } catch (e) {
        console.error(
          `Error while fetching data for ${pharmacyData.normalizedCenterCode}`,
          e
        );
      }
    }

    console.log(
      `${processedCount}/${pharmaciesWithoutCoords.length} has been correctly processed`
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
