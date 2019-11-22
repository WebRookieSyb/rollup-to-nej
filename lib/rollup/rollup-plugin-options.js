const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const vue = require("rollup-plugin-vue");
const postcss = require("rollup-plugin-postcss")
const color = require("../util/color")
const alias = require("@rollup/plugin-alias");
const path = require("path");
const amd = require("rollup-plugin-amd");
const replace = require("@rollup/plugin-replace")
// const alias = require("")
const commonjs = require("rollup-plugin-commonjs")
const rootDir = path.resolve(__dirname);
const projectRootDir = process.cwd();
// const customResolver = resolve({
// });
const plugins = {
  vue:[
    resolve(),
    babel({
      // "babelrc":true,
      // "presets": ["@babel/preset-env"],
      "root": rootDir,
      // "rootMode": "upward"
    }),
    // commonjs(),
  //   alias({entries: [{
  //     // pool: '/Users/shuyibin/SYB/rollup-vue-nej/lib'
  //     find: 'pool',
  //     replacement: path.join(projectRootDir,'./lib')
  //   }],
  // }),
  replace({ 'NEJ.define': 'define' }),
  amd({
    // include: path.join(projectRootDir,'./lib'),
    // exclude: [ 'node_modules/**' ], // Optional, Default: undefined (nothing)
    // converter: {}, // Optional, Default: undefined
    // rewire: function (moduleId, parentPath) { // Optional, Default: false
    //     return './basePath/' + moduleId;
    // }
  }),
    vue(),
  ],
  react:[
    resolve()
  ]
}
// const cssPlugins = {
//   Less: postcss({extensions: ['.less']})
// }
module.exports = type => {
  if(plugins[type]) {

    return plugins[type];
  }
  console.log(color(`can not find ${type} plugin config`).red)
}