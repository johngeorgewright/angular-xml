/* eslint-env node */

module.exports = function (config) {
  'use strict';

  config.set({

    basePath: '..',

    frameworks: ['jasmine'],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/x2js/xml2json.js',
      'angular-xml.js',
      'test/unit/**/*Spec.js'
    ],

    exclude: [
      '**/*.swp'
    ],

    preprocessors: {
      'angular-xml.js': 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit'
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'lcovonly',
      dir: 'coverage/'
    },

    // web server port
    port: 9876,

    // cli runner port
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    customLaunchers: {
      SLFirefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '67'
      }
    },

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    sauceLabs: {
      accessKey: process.env.SAUCE_ACCESS_KEY,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      username: process.env.SAUCE_USERNAME
    }

  });
};
