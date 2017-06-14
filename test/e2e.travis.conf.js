/* global exports */

// An example configuration file.
exports.config = {
  specs: ['e2e/**/*Spec.js'],
  baseUrl: 'http://localhost:8000',
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  capabilities: {
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
  }
};
