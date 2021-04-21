const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-svgr");
const { i18n } = require('./next-i18next.config');

module.exports = withPlugins([withSvgr], {
    i18n
});
