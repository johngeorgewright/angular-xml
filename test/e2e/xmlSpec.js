describe('x2js', function () {

  beforeEach(function () {
    browser.get('/test/e2e/xmlSpec.html');
  });

  it('will render 2 blogs and display configuration title', function () {
    expect(element.all(by.repeater('blog in blogs')).count()).toBe(2);
    expect(element(by.binding('title')).getText()).toEqual('login required for myapp');
  });

});

