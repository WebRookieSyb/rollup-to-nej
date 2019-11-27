// const file = require("./util/file");
const doRollup = require("../rollup")

module.exports = (command, options) => {
  console.log('开始打包并监听...');
  doRollup.doWatch(command, options);
}