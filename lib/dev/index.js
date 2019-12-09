const doRollup = require("../rollup")
const getConfig = require("../util/getConfig")

module.exports = (command, options) => {
  console.log('开始打包并监听...');
  console.log(options);
  const conf = getConfig(process.cwd())
  if(conf) {
    options = Object.assign(options, conf.config)
  }
  doRollup.doWatch(command, options);
}