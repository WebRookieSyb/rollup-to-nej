const doRollup = require("../rollup");
const getConfig = require("../util/getConfig");
const { formatAlias } = require("../util/format");

module.exports = (command, options) => {
  console.log("开始打包...");
  const newOptions = {
    input: options.input,
    output: options.output
  };
  const conf = getConfig(process.cwd());
  if (options.srcAlias && typeof options.srcAlias === "string") {
    newOptions.alias = formatAlias(options.srcAlias);
  }
  if (conf) {
    options = Object.assign(newOptions, conf.config);
  }
  console.log(newOptions);

  doRollup.doBuild(command, newOptions);
};
