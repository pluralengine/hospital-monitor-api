'use strict';
const data = require('../default-data/hospital-with-coord-data.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hospitals = parseHospitals(data);
    const result = hospitals.map(hospital =>
      queryInterface.bulkInsert('Hospitals', [hospital]).catch(row => {
        console.error(`Error creating hospital with name: "${hospital.name}"`);
        console.error(row);
      })
    );

    return Promise.all(result);
  },

  down: (queryInterface, Sequelize) => {
    const hospitals = parseHospitals(data);

    return queryInterface.bulkDelete(
      'Hospitals',
      { name: { [Sequelize.Op.in]: hospitals.map(hospital => hospital.name) } },
      {}
    );
  },
};

function parseHospitals(hospitals) {
  return hospitals.map(hospital => {
    return {
      name: hospital.name,
      address: hospital.address,
      phoneNum: hospital.phonenum,
      areas: hospital.areas,
      provinces: hospital.provinces,
      regionsCcaa: hospital.regionsccaa,
      postcode: hospital.postcode,
      bedNum: hospital.bednum,
      type: hospital.type,
      dependencyType: hospital.typeofdependency,
      funcDependency: hospital.funcdependency,
      email: hospital.email,
      geometryLat: hospital.geometry.lat,
      geometryLng: hospital.geometry.lng,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
}
