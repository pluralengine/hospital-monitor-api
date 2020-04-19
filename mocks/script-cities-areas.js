const fs = require('fs');
const data = require('./cities-raw.js');

const commaSeparated = data.split(',');
const tabSeparated = commaSeparated.map(element => {
  return element.split('\t');
});

const flattened = tabSeparated.map(element => {
  return element.flat();
});

function parseIntoObject(cities) {
  const areasObject = {};
  const provinces = [];
  for (let i = 0; i < cities.length; i++) {
    if (!provinces.some(province => province === cities[i][1])) {
      areasObject[cities[i][1]] = [];
      provinces.push(cities[i][1]);
      console.log(i, cities[i][1], 'was created');
    }
    areasObject[cities[i][1]].push(cities[i][0]);
    console.log(`${i}/${cities.length}`);
  }
  return areasObject;
}

const parsedData = parseIntoObject(flattened);

fs.writeFile('./areas.js', JSON.stringify(parsedData), error => {
  console.error(error);
});
