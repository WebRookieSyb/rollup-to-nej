const doRollup = require("../rollup")
const getConfig = require("../util/getConfig")

module.exports = (command, options) => {
  console.log('开始打包...');
  const conf = getConfig(process.cwd())
  options = Object.assign(options, conf.config )
  doRollup.doBuild(command, options);
}