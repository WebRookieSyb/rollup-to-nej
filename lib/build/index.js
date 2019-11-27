// const file = require("./util/file");
const doRollup = require("../rollup")
module.exports = (command, options) => {
  console.log('开始打包...');
  doRollup.doBuild(command, options);
}