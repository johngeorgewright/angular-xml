describe('x2js', function () {

  beforeEach(function () {
    browser.get('/test/e2e/xmlSpec.html');
  });

  it('will render 2 blogs', function () {
    expect(element.all(by.repeater('blog in blogs')).count()).toBe(2);
  });

});

