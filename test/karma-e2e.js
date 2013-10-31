/* global module */

module.exports = function(config){
  config.set({

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

    browsers : ['Chrome'],

    singleRun : false,

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-ng-scenario'
    ],

    autoWatch : true,
  });
};

