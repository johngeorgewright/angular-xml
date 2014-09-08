describe('xml', function () {

  var xmlString = '<tests><test id="1"/></tests>',
      DOMParser, ActiveXObject, win;

  beforeEach(module('xml'));

  describe('manual parsing', function () {

    beforeEach(inject(function ($window) {
      win = $window;
      DOMParser = win.DOMParser;
      ActiveXObject = win.ActiveXObject;
    }));

    afterEach(function () {
      win.DOMParser = DOMParser;
      win.ActiveXObject = ActiveXObject;
    });

    describe('xmlFilter', function () {

      var filter, parser;

      beforeEach(inject(function (xmlParser, xmlFilter) {
        filter = xmlFilter;
        parser = xmlParser;
      }));

      it('will use the xmlParser.parse() method', function () {
        spyOn(parser, 'parse');
        filter(xmlString);
        expect(parser.parse).toHaveBeenCalledWith(xmlString);
      });

      it('will return a ng.element object', function () {
        var returnValue;
        spyOn(angular, 'element').andReturn('ng.xml.element');
        returnValue = filter(xmlString);
        expect(returnValue).toBe('ng.xml.element');
        angular.element.andCallThrough();
      });

      it('should integrate as expected', function () {
        var xml = filter(xmlString);
        expect(xml.find('test').length).toBe(1);
      });

    });

    describe('XMLParser', function () {

      describe('DOMParser', function () {

        var DOMParser;

        beforeEach(function () {
          DOMParser = jasmine.createSpy('DOMParser');
          DOMParser.prototype = jasmine.createSpyObj('prototype', ['parseFromString']);
          win.DOMParser = DOMParser;
          win.ActiveXObject = null;
        });

        it('will use the DOMParser class when it is available', inject(function (xmlParser) {
          expect(DOMParser).toHaveBeenCalled();
          xmlParser.parse(xmlString);
          expect(DOMParser.prototype.parseFromString).toHaveBeenCalled();
        }));

      });

      describe('ActiveXObject', function () {

        var ActiveXObject;

        beforeEach(function () {
          ActiveXObject = jasmine.createSpy('ActiveXObject');
          ActiveXObject.prototype = jasmine.createSpyObj('prototype', ['loadXML']);
          win.ActiveXObject = ActiveXObject;
          win.DOMParser = null;
        });

        describe('successful parsing', function () {

          beforeEach(function () {
            ActiveXObject.prototype.parseError = {errorCode: 0};
          });

          it('will use the ActiveXObject class when DOMParser is not available', inject(function (xmlParser) {
            expect(ActiveXObject).toHaveBeenCalled();
            xmlParser.parse(xmlString);
            expect(ActiveXObject.prototype.loadXML).toHaveBeenCalled();
          }));

        });

        describe('unsuccessful parsing', function () {

          beforeEach(function () {
            ActiveXObject.prototype.parseError = {errorCode: 1, reason: 'mung'};
          });

          it('will throw an error when there is a badly formed XML string', inject(function (xmlParser) {
            expect(function () {
              xmlParser.parse(xmlString);
            }).toThrow();
          }));

        });

      });

    });

  });

  describe('automatic parsing', function () {

    describe('httpInterceptor', function () {

      var responseHeaders, xmlFilter, $xmlHttpInterceptor;

      beforeEach(module(function ($provide) {
        responseHeaders = jasmine.createSpy('response.headers').andReturn('application/xml');
        xmlFilter = jasmine.createSpy('xmlFilter');
        $provide.value('xmlFilter', xmlFilter);
      }));

      beforeEach(inject(function (xmlHttpInterceptor) {
        $xmlHttpInterceptor = xmlHttpInterceptor;
      }));

      function respond() {
        $xmlHttpInterceptor.response({
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
        expect(xmlFilter).toHaveBeenCalled();
      });

      it('will only act on a XML response', function () {
        responseHeaders.andReturn('text/html');
        respond();
        expect(xmlFilter).not.toHaveBeenCalled();
      });

    });

  });

});

