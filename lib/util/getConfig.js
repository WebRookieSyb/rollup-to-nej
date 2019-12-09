const { cosmiconfigSync } = require("cosmiconfig")
const getConfig = function(dir) {
  const explorerSync = cosmiconfigSync('rolltonej')
  const config = explorerSync.search(dir);
  return config;
}

module.exports = getConfig;