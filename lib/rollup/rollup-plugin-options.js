const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const vue = require("rollup-plugin-vue");
// const alias = require("@rollup/plugin-alias");
const path = require("path");
const amd = require("rollup-plugin-amd");
const replace = require("@rollup/plugin-replace")
const rootDir = path.resolve(__dirname);
const plugins = {
  vue:[
    resolve(),
    // alias({entries: [{
    //     find: 'componentUrl',
    //     replacement: projectRootDir+'/raw/test/ui.vue.js'
    //   }],
    // }),
    replace({ 'NEJ.define': 'define' }),
    amd(),
    vue(),
    babel({
      "root": rootDir,
    })
  ],
  react:[
    resolve()
  ]
}
module.exports = type => {
  if(plugins[type]) {

    return plugins[type];
  }
  // console.log(color(`can not find ${type} plugin config`).red)
}