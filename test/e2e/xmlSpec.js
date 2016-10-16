describe('x2js', function () {
  'use strict';

  beforeEach(function () {
    browser.get('/test/e2e/xmlSpec.html');
  });

  it('will render 2 blogs', function () {
    expect(element.all(by.repeater('blog in blogs')).count()).toBe(2);
  });

  it('display configuration title', function () {
    expect(element(by.binding('title')).getText()).toEqual('login required for myapp');
  });

});
