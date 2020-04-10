const opencage = require('opencage-api-client');

exports.findCoordinates = function (address) {
  return opencage
    .geocode({ q: address })
    .then(results => results.results[0].geometry)
    .catch(error => {
      console.error(error);
    });
};

exports.createCompatibleAddress = function (hospital) {
  return `${hospital.name}, ${hospital.areas}, España`;
};
