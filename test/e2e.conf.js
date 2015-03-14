/* global exports */

// An example configuration file.
exports.config = {
  // Do not start a Selenium Standalone sever - only run this using chrome.
  directConnect: true,
  chromeDriver: '../selenium/chromedriver',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['e2e/**/*Spec.js'],

  baseUrl: 'http://localhost:8000',

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  },

  keepAlive: true
};
