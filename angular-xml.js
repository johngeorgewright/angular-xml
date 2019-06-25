if (!X2JS) {
  throw new Error('You\'re required to include the X2JS library to use the xml module.')
}

(function (ng, X2JS) {
  'use strict'

  function responseIsXml (response) {
    var contentType = response.headers('content-type')
    if (contentType) {
      return contentType.search(/\Wxml/i) > -1
    } else {
      return false
    }
  }

  function xmlHttpInterceptorFactory ($q, x2js) {
    function responseHandler (response) {
      if (response && responseIsXml(response)) {
        response.data = x2js.xml_str2json(response.data)
        return response
      } else {
        return $q.when(response)
      }
    }
    function responseErrorHandler (response) {
      if (response && responseIsXml(response)) {
        response.data = x2js.xml_str2json(response.data)
      }
      return $q.reject(response)
    }
    return {
      response: responseHandler,
      responseError: responseErrorHandler
    }
  }

  function configProvider ($provide) {
    $provide.factory('xmlHttpInterceptor', ['$q', 'x2js', xmlHttpInterceptorFactory])
  }

  function X2JSProvider () {
    this.config = {}
    this.$get = ['X2JS', function (X2JS) {
      return new X2JS(this.config)
    }]
  }

  if (ng) {
    ng
      .module('xml', [])
      .config(['$provide', configProvider])
      .provider('x2js', X2JSProvider)
      .value('X2JS', X2JS)
  }
}(angular, X2JS))
