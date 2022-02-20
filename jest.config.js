module.exports = {
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js*',
    '!src/server.js',
  ],
  collectCoverage: true,
  verbose: false,
};
