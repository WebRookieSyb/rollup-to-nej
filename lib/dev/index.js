// const file = require("./util/file");
const doRollup = require("../rollup")

// const build = () => {

// }


module.exports = (command, options) => {
  doRollup.doWatch(command, options);
}