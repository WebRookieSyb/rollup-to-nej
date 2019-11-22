// const file = require("./util/file");
const doRollup = require("../rollup")

// const build = () => {

// }


module.exports = (command, options) => {
  doRollup.doBuild(command, options);
}