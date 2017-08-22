// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer+'/#/shoppingCart')
      .pause(1000)
      .click('#products-list li:nth-of-type(1) .add-to-cart')
      .click('#products-list li:nth-of-type(1) .add-to-cart')
      .pause(1000)
      .click('#products-list li:nth-of-type(2) .add-to-cart')
      .pause(1000)
      .click('#products-list li:nth-of-type(3) .add-to-cart')
      .pause(1000)
      .assert.containsText('#total', '1031')
      .end()
  }
}
