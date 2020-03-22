const rollup = require("rollup");
const chalk = require("chalk");
const {setPlugins} = require("./rollup-plugin-options");
const watch = require("./rollup-watch-options");
const config = require("../../package.json");
const { findFiles, checkOption } = require("../util/findFile");

const doBuild = async (type, options) => {
  if (!checkOption(options)) {
    console.log(
      chalk.red(`当前输入输出文件参数为${JSON.stringify(options)}，请正确配置`)
    );
    return;
  }
  const paths = await findFiles(options.input);
  if (paths.length === 0) {
    console.log(chalk.red("未找到打包文件"));
    return;
  }
  // const promiseAll = paths.map(path => {
  //   return new Promise((resolve,reject) => {
  //     const { inputOptions, outputOptions } = formatOptionsForRollup({
  //       type,
  //       path,
  //       ...options
  //     });
  //     buildFile(inputOptions, outputOptions).then(()=>resolve())

  //   });
  // });
  const promiseAll = paths.map(async path => {
    const { inputOptions, outputOptions } = formatOptionsForRollup({
      type,
      path,
      ...options
    });
    await buildFile(inputOptions, outputOptions);
  });
  await Promise.all(promiseAll);
  console.log(chalk.green("打包已完成"));
};

const doWatch = async (type, options) => {
  if (!checkOption(options)) {
    console.log(
      chalk.red(`当前输入输出文件参数为${JSON.stringify(options)}，请正确配置`)
    );
    return;
  }
  const paths = await findFiles(options.input);
  if (paths.length === 0) {
    console.log(chalk.red("未找到打包文件"));
    return;
  }
  const promiseAll = paths.map(async path => {
    const { inputOptions, outputOptions } = formatOptionsForRollup({
      type,
      path,
      ...options
    });
    const watchoptions = {
      ...inputOptions,
      ...outputOptions,
      watch: watch(options.input)
    };
    await watchFile(watchoptions);
  });
  await Promise.all(promiseAll);
  console.log(chalk.green("打包已完成"));
};

// 配置输入
const setInputOptions = (type, input, newOutput, alias, removeComments) => ({
  input: input,
  plugins: setPlugins(type, newOutput, alias, removeComments),
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
    banner: `/**
* ------------------------------------------
* Rollup vue to nej
* @version  ${config.version}
* @path  ${output}
* 
* You need to check the changes after packing
* ------------------------------------------
*/`,
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
  output = "src",
  alias = {},
  removeComments
}) {
  let newOutput = path.replace(input, output);
  newOutput = newOutput.replace('.ts','.js');
  console.log(`正在打包 '${path}' to '${newOutput}'`);
  // if (path.indexOf(".js") > -1) type = "js";
  const inputOptions = setInputOptions(type, path, newOutput, alias, removeComments);
  const outputOptions = setOutputOptions(newOutput);
  return {
    inputOptions,
    outputOptions
  };
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
