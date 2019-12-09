const doRollup = require("../rollup")
const getConfig = require("../util/getConfig")

module.exports = (command, options) => {
  console.log('开始打包...');
  console.log(options);
  const conf = getConfig(process.cwd())
  console.log(conf)
  if(conf) {
    options = Object.assign(options, conf.config)
  }
  doRollup.doBuild(command, options);
}