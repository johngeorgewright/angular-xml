/* global module */

module.exports = function(config){
  config.set({

    // global config for SauceLabs
    sauceLabs: {
      username: 'johngeorgewright',
      accessKey: '755cb43c-80bc-45cb-b84f-f8d9c48fd5e2',
      startConnect: false,
      testName: 'E2E tests'
    },

    // define SL browsers
    customLaunchers: {
      sl_chrome_linux: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'linux'
      }
    },

    basePath : '..',

    frameworks: ['ng-scenario'],

    files : [
      'bower_components/angular/angular.js',
      'angular-xml.js',
      'test/e2e/**/*Spec.js'
    ],

    exclude: [
      '**/*.swp'
    ],

    proxies : {
      '/app/': 'http://localhost:8000/'
    },

    reporters: ['progress'],

    port: 9877,

    runnerPort: 9101,

    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],
    /* browsers: ['sl_chrome_linux'], */

    singleRun: false,

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-scenario',
      'karma-sauce-launcher'
    ],

    autoWatch: true,
  });
};

