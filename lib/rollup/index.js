const rollup = require("rollup");
const chalk = require("chalk");
const plugin = require("./rollup-plugin-options");
const watch = require("./rollup-watch-options");
const { findFiles, checkOption } = require("../util/findFile");

const doBuild = (type, options) => {
  if(!checkOption(options)) {
    console.log(chalk.red(`当前输入输出文件参数为${JSON.stringify(options)}，请正确配置`))
    return;
  }
  findFiles(options.input)
    .then(paths => {
      if(paths.length === 0) {
        console.log(chalk.red('未找到打包文件'))
      }
      paths.forEach(path => {
        const {inputOptions,outputOptions} = formatOptionsForRollup({
          type,
          path,
          ...options
        })
        buildFile(inputOptions, outputOptions);
      });
    })
    // .then(() => {
    //   console.log(chalk.green("打包已完成"));
    // })
    // .catch(error => {
    //   console.log(chalk.red("打包失败"));
    //   console.log(error);
    // });
};

const doWatch = (type, options) => {
  if(!checkOption(options)) {
    console.log(chalk.red(`当前输入输出文件参数为${JSON.stringify(options)}，请正确配置`))
    return;
  }
  findFiles(options.input)
    .then(paths => {
      if(paths.length === 0) {
        console.log(chalk.red('未找到打包文件'))
      }
      paths.forEach(path => {
        const {inputOptions,outputOptions} = formatOptionsForRollup({
          type,
          path,
          ...options
        })
        const watchoptions = {
          ...inputOptions,
          ...outputOptions,
          watch: watch(options.input)
        };
        watchFile(watchoptions);
      });
    })
    // .then(() => {
    //   console.log(chalk.green("打包已完成"));
    // });
};

// 配置输入
const setInputOptions = (type, input) => ({
  input: input,
  plugins: plugin(type),
  onwarn: warning => {
    if (warning.code === "UNRESOLVED_IMPORT") return;
    console.warn(warning.message);
  }
});

// 配置输出
const setOutputOptions = output => ({
  output: {
    format: "amd",
    file: output,
    strict: false,
    amd: {
      define: "NEJ.define"
    }
  }
});

// const getCssType = async () => {
//   let  cssTypeList = ['None', 'Sass', 'Less'];
//   const chooseType = await question.getCssType(cssTypeList);
//   return chooseType.cssType;
// }
/**
 * Ger formated options for rollup
 * 
 */
function formatOptionsForRollup({
  type = "vue",
  path = "",
  input = "raw",
  output = "src"
}) {
  output = path.replace(input, output);
  console.log(`正在打包 '${path}' to '${output}'`);
  // if (path.indexOf(".js") > -1) type = "js";
  const inputOptions = setInputOptions(type, path);
  const outputOptions = setOutputOptions(output);
  return {
    inputOptions,
    outputOptions
  }
}

// 打包文件
const buildFile = async (inputOptions, outputOptions) => {
  try {
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
  } catch (error) {
    console.log(chalk.red(`${inputOptions.input} 打包失败`));
    console.log(chalk.red(error));
  }
};
// 打包并监听文件
const watchFile = async watchoptions => {
  let isFirstBuild = true;
  const watcher = rollup.watch(watchoptions);
  watcher.on("event", event => {
    if (event.code === "START") {
      if (!isFirstBuild) {
        console.log("文件修改，重新开始打包...");
      }
    } else if (event.code === "END") {
      if (!isFirstBuild) {
        console.log(chalk.green(`${watchoptions.input} 打包已完成`));
      }
      isFirstBuild = false;
    } else if (event.code === "ERROR" || event.code === "FATAL") {
      console.log(chalk.red(`${watchoptions.output.file} 打包失败`));
      console.log(chalk.red(event.error));
    }
  });
};
module.exports = {
  doBuild,
  doWatch,
  formatOptionsForRollup
};
