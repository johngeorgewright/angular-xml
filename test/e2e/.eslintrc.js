const conf = require('../../.eslintrc.js')

module.exports = Object.assign({}, conf, {
  env: {
    jasmine: true,
    protractor: true
  }
})
