/* global browser: false, repeater: false */

describe('xml', function () {

  beforeEach(function () {
    browser().navigateTo('/app/test/e2e/xmlSpec.html');
  });

  it('will render 2 blogs', function () {
    expect(repeater('.blogs li').count()).toBe(2);
  });

});

