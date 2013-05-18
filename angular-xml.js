(function (win) {
  
  "use strict";
  
  win
    .angular
    .module('xml', [])
    .config(['$provide', function ($provide) {
      
      $provide.factory('xmlHttpInterceptor', ['$window', 'xmlFilter', function ($window, xmlFilter) {
        return function (promise) {
          return promise.then(function (response) {
            response.xml = xmlFilter(response.data);
            response.xml = $window.angular.element(response.xml);
            return response;
          });
        };
      }]);
      
    }])
    .filter('xml', ['$window', function ($window) {
      return function (input) {
        
        var xmlDoc, parser;
        
        if ($window.DOMParser) {
          parser = new $window.DOMParser();
          xmlDoc = parser.parseFromString(input, 'text/xml');
        } else if ($window.ActiveXObject) {
          // IE
          xmlDoc = new $window.ActiveXObject('Microsoft.XMLDOM');
          xmlDoc.async = false;
          xmlDoc.loadXml(input);
        } else {
          throw new Error('Cannot parse XML in this environment.');
        }
        
        return xmlDoc;
        
      };
    }]);
  
}(this));
