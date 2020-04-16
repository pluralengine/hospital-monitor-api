module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  watchPathIgnorePatterns: [
    '<rootDir>/db/default-data/'
  ],
  setupFiles:[
      './setupTests.js'
  ]
};
