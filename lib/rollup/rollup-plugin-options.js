const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const vue = require("rollup-plugin-vue");
// const alias = require("@rollup/plugin-alias");
const path = require("path");
const amd = require("rollup-plugin-amd");
const replace = require("@rollup/plugin-replace");
const rootDir = path.resolve(__dirname);
const plugins = {
  vue: [
    resolve(),
    // alias({entries: [{
    //     find: 'componentUrl',
    //     replacement: projectRootDir+'/raw/test/ui.vue.js'
    //   }],
    // }),
    replace({ "NEJ.define": "define" }),
    amd(),
    babel({
      //直接放在配置中会直接在要打包的工程中寻找babel配置
      // "presets": ["@babel/preset-env"],
      // "plugins": ["transform-vue-jsx"],
      root: rootDir
    }),
    vue()
  ],
  js: [
    resolve(),
    replace({ "NEJ.define": "define" }),
    amd(),
    babel({
      root: rootDir
    })
  ]
};
module.exports = type => {
  process.env.NODE_ENV = type;
  if (plugins[type]) {
    return plugins[type];
  }
  // console.log(color(`can not find ${type} plugin config`).red)
};
