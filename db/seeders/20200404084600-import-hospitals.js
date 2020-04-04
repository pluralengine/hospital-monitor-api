'use strict';
const data = require('../default-data/hospital-data-with-coord.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hospitals = parseHospitals(data);
    const result = hospitals.map(hospital =>
      queryInterface
        .bulkInsert('Hospitals', [hospital])
        .catch(row => console.log(row))
    );
    return Promise.all(result);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Hospitals', null, {});
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
