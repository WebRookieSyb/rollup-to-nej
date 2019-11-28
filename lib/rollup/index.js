const rollup = require("rollup");
const chalk = require("chalk")
const plugin = require("./rollup-plugin-options");
const watch = require("./rollup-watch-options");
const { findFiles } = require("../util/findFile")

const doBuild = (type, options) => {
  findFiles(options.input)
    .then(paths => {
      paths.forEach((input)=>{
        let output = input.replace(options.input, options.output).replace('.vue', '.js');
        console.log(`正在打包 '${input}' to '${output}'`)
        if(input.indexOf('.js')>-1) type = 'js';
        const { inputOptions, outputOptions } = setOptions(type, input, output);
        buildFile(inputOptions, outputOptions)
      })
    })
    .then(() => {
    console.log(chalk.green('打包已完成'))
  });
}

const doWatch = (type, options) => {
  findFiles(options.input)
    .then(paths => {
      paths.forEach((input)=>{
        let output = input.replace(options.input, options.output).replace('.vue', '.js');
        console.log(`正在打包 '${input}' to '${output}'`)
        if(input.indexOf('.js')>-1) type = 'js';
        const { watchoptions } = setOptions(type, input, output);
        watchFile(watchoptions);
      })
    })
    .then(() => {
    console.log(chalk.green('打包已完成'))
  });
}
const setOptions = (type, input, output)=> {
    const inputOptions = {
    input: input,
    plugins: plugin(type),
    onwarn: (warning)=>{
      if (warning.code === 'UNRESOLVED_IMPORT') return;
      console.warn(warning.message)
    }
  }
  const outputOptions = {
    output: {
      format: 'amd',
      file: output,
      strict: false,
      amd: {
        define: 'NEJ.define'
      }
    }
  }
  const watchoptions = {
    ...inputOptions,
    ...outputOptions,
    watch: watch(input)
  }
  return {
    inputOptions,
    outputOptions,
    watchoptions
  }
}
// const getCssType = async () => {
//   let  cssTypeList = ['None', 'Sass', 'Less'];
//   const chooseType = await question.getCssType(cssTypeList);
//   return chooseType.cssType;
// }
const buildFile = async (inputOptions, outputOptions)=> {
  try {
    const bundle = await rollup.rollup(inputOptions)
    await bundle.write(outputOptions)
  } catch (error) {
    console.log(error);
    console.log(chalk.red('打包失败'))
  }  
}
const watchFile = async (watchoptions)=> {
  let isFirstBuild = true;
  const watcher = rollup.watch(watchoptions);
  watcher.on('event', event => {
    if(event.code === 'START') {
      if(!isFirstBuild) {
        console.log('文件修改，重新开始打包...')
      }
    }else if(event.code === 'END') {
      if(!isFirstBuild) {
        console.log(chalk.green('打包已完成'))
      }
      isFirstBuild = false;
    }
  });
}
module.exports = {
  doBuild,
  doWatch
}