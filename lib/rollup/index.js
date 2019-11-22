const rollup = require("rollup");
const plugin = require("./rollup-plugin-options");
const watch = require("./rollup-watch-options");
const color = require("../util/color")
const question = require("../util/question");

const setOptions = (type, options)=> {
  const inputOptions = {
    input: options.input,
    plugins: plugin(type)
  }
  const outputOptions = {
    output: {
      format: 'amd',
      file: options.output,
      strict: false,
      amd: {
        define: 'NEJ.define'
      }
    }
  }
  const watchoptions = {
    ...inputOptions,
    ...outputOptions,
    watch: watch(options.input)
  }
  return {
    inputOptions,
    outputOptions,
    watchoptions
  }
}
const getCssType = async () => {
  let  cssTypeList = ['None', 'Sass', 'Less'];
  const chooseType = await question.getCssType(cssTypeList);
  return chooseType.cssType;
}
const doBuild = async (type, options)=> {
  // const cssType = await getCssType()
  const { inputOptions, outputOptions } = setOptions(type, options)
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}
const doWatch = async (type, options)=> {
  // const cssType = await getCssType();
  const { watchoptions } = setOptions(type, options)
  const watcher = rollup.watch(watchoptions);
  watcher.on('event', event => {
    // event.code 会是下面其中一个：
    //   START        — 监听器正在启动（重启）
    //   BUNDLE_START — 构建单个文件束
    //   BUNDLE_END   — 完成文件束构建
    //   END          — 完成所有文件束构建
    //   ERROR        — 构建时遇到错误
    //   FATAL        — 遇到无可修复的错误

    if(event.code === 'END') {
      console.log(color(`构建已完成`).green)
    }
  });
}
module.exports = {
  doBuild,
  doWatch
}