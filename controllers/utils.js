const opencage = require('opencage-api-client');

exports.findCoordinates = function(address) {
  return opencage
    .geocode({ q: address })
    .then(results => results.results[0].geometry)
    .catch(error => {
      console.log('error', error.message);
    });
};

exports.createCompatibleAddress = function(hospital) {
  return `${hospital.address.split('  ')[0]},${
    hospital.address.split('  ')[1]
  },${hospital.areas},${hospital.provinces},${hospital.regionsccaa}, España`;
};
