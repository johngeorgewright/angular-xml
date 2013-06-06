/*global: angular describe it beforeEach afterEach module inject jasmine */

describe('xml', function () {

  var xmlString = '<tests><test id="1"/></tests>';

  beforeEach(module('xml'));

  describe('xmlFilter', function () {

    var filter,
        ActiveXObject,
        DOMParser,
        win;

    beforeEach(inject(function ($window, xmlFilter) {
      filter                  = xmlFilter;
      ActiveXObject           = jasmine.createSpy('ActiveXObject');
      ActiveXObject.prototype = jasmine.createSpyObj('prototype', ['loadXml']);
      DOMParser               = jasmine.createSpy('DOMParser');
      DOMParser.prototype     = jasmine.createSpyObj('prototype', ['parseFromString']);
      win                     = $window;
      win.ActiveXObject       = ActiveXObject;
      win.DOMParser           = DOMParser;
    }));

    it('will use the DOMParser class when it is available', function () {
      filter(xmlString);
      expect(DOMParser).toHaveBeenCalled();
      expect(DOMParser.prototype.parseFromString).toHaveBeenCalled();
    });

    it('will use the ActiveXObject class when DOMParser is not available', function () {
      win.DOMParser = false;
      filter(xmlString);
      expect(ActiveXObject).toHaveBeenCalled();
      expect(ActiveXObject.prototype.loadXml).toHaveBeenCalled();
    });

    it('will throw an error when niether the DOMParser or ActiveXObject classes are available', function () {
      win.DOMParser = false;
      win.ActiveXObject = false;
      expect(filter).toThrow();
    });

    it('will return a ng.element object', function () {
      var returnValue;
      spyOn(angular, 'element').andReturn('ng.xml.element');
      returnValue = filter(xmlString);
      expect(returnValue).toBe('ng.xml.element');
      angular.element.andCallThrough();
    });

  });

  /* I'd be super stoked if anyone can get 
   * this test working.
  describe('httpInterceptor', function () {

    var interceptor,
        deferred,
        response,
        promise;

    beforeEach(inject(function ($q, xmlHttpInterceptor) {
      deferred    = $q.defer();
      response    = {data: xmlString};
      promise     = deferred.promise;
      interceptor = xmlHttpInterceptor;
    }));

    it('will return a ng.element object', function () {
      var done = false;
      interceptor(promise).then(function (el) {
        dump(el);
        expect(el).not.toBeUndefined();
        done = true;
      });
      deferred.resolve(response);
      waitsFor(function () {
        return done;
      });
    });

  });
  */

});

