const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const vue = require("rollup-plugin-vue");
// const alias = require("@rollup/plugin-alias");
const path = require("path");
const fs = require("fs");
const amd = require("rollup-plugin-amd");
// const replace = require("@rollup/plugin-replace");
const rootDir = path.resolve(__dirname);

// 替换文件中动别名路径
const replaceSrc = (source = "", alias = {}) => {
  for (let [key, value] of Object.entries(alias)) {
    const reg = new RegExp(key, "g");
    source = source.replace(reg, value);
  }
  return source;
};

const setPlugins = (type, newOutput, alias) => {
  process.env.NODE_ENV = type;
  const plugins = {
    vue: [
      resolve(),
      // alias({entries: [{
      //     find: 'componentUrl',
      //     replacement: projectRootDir+'/raw/test/ui.vue.js'
      //   }],
      // }),
      // 不使用replace来替换模块引入的路径是因为会在打包前替换，使得模块会被打包进去，我们希望模块不会被重复打包
      // replace({ "@nej": "./" })
      // 会将打包完成后的NEJ.define替换，去除防止这个问题，不在代码中引入NEJ.define的模块
      // replace({ "NEJ.define": "define" }),
      amd(),
      babel({
        //直接放在配置中会直接在要打包的工程中寻找babel配置
        // "presets": ["@babel/preset-env"],
        // "plugins": ["transform-vue-jsx"],
        root: rootDir
      }),
      vue({
        needMap: false
      }),
      {
        // 修改打包结束后的文件，替换模块引用路径
        writeBundle() {
          const data = fs.readFileSync(newOutput, { encoding: "utf8" });
          const newData = replaceSrc(data, alias);
          fs.writeFileSync(newOutput, newData);
        }
      }
    ],
    js: [
      resolve(),
      // replace({ "NEJ.define": "define" }),
      amd(),
      babel({
        root: rootDir
      })
    ]
  };
  if (plugins[type]) {
    return plugins[type];
  }
};
module.exports = { setPlugins, replaceSrc };
