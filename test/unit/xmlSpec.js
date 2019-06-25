describe('xml', function () {
  'use strict';

  var xmlString = '<tests><test id="1"/></tests>';

  beforeEach(module('xml'));

  describe('x2js', function () {
    it('will be an instance of X2JS', inject(function (x2js) {
      expect(x2js instanceof X2JS).toBe(true);
    }));
  });

  describe('x2jsProvider', function () {
    var X2JS, config;

    beforeEach(module(function ($provide, x2jsProvider) {
      X2JS = jasmine.createSpy('X2JS');
      config = { mung: 'face' };
      x2jsProvider.config = config;
      $provide.value('X2JS', X2JS);
    }));

    it('will pass any configurations to the X2JS constructor', inject(function (x2js) {
      expect(x2js).not.toBeUndefined();
      expect(X2JS).toHaveBeenCalledWith(config);
    }));
  });

  describe('httpInterceptor', function () {
    var responseHeaders, x2js, $xmlHttpInterceptor;

    beforeEach(module(function ($provide) {
      responseHeaders = jasmine.createSpy('response.headers').and.returnValue('application/xml');
      x2js = {
        xml_str2json: jasmine.createSpy('xxml_str2json')
      };
      $provide.value('x2js', x2js);
    }));

    beforeEach(inject(function (xmlHttpInterceptor) {
      $xmlHttpInterceptor = xmlHttpInterceptor;
    }));

    function respond () {
      $xmlHttpInterceptor.response({
        data: xmlString,
        headers: responseHeaders
      });
    }

    function respondWithError () {
      $xmlHttpInterceptor.responseError({
        data: xmlString,
        headers: responseHeaders
      });
    }

    it('will check for the content-type', function () {
      respond();
      expect(responseHeaders).toHaveBeenCalledWith('content-type');
    });

    it('will return a ng.element object', function () {
      respond();
      expect(x2js.xml_str2json).toHaveBeenCalled();
    });

    it('will also work with the text/xml content-type', function () {
      responseHeaders.and.returnValue('text/xml');
      respond();
      expect(x2js.xml_str2json).toHaveBeenCalled();
    });

    it('will also work when then content-type has extra parameters', function () {
      responseHeaders.and.returnValue('application/xml, charset=UTF-8');
      respond();
      expect(x2js.xml_str2json).toHaveBeenCalled();
    });

    it('will work with engine generated rss feeds, with alternate response headers', function () {
      responseHeaders.and.returnValue('application/rss+xml');
      respond();
      expect(x2js.xml_str2json).toHaveBeenCalled();
    });

    it('will only act on a XML response', function () {
      responseHeaders.and.returnValue('text/html');
      respond();
      expect(x2js.xml_str2json).not.toHaveBeenCalled();
    });

    it('will only act on a response with a content-type', function () {
      responseHeaders.and.returnValue(null);
      respond();
      expect(x2js.xml_str2json).not.toHaveBeenCalled();
    });

    it('will also convert error responses', function () {
      responseHeaders.and.returnValue('application/xml');
      respondWithError();
      expect(x2js.xml_str2json).toHaveBeenCalled();
    });
  });
});
