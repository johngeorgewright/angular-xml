const conf = require('../../.eslintrc.js')

module.exports = Object.assign({}, conf, {
  env: {
    jasmine: true
  },
  globals: Object.assign({}, conf.globals, {
    inject: false
  })
})
