const babelConfig = {
  vue: {
    presets: ["@babel/preset-env"],
    plugins: ["transform-vue-jsx","@babel/proposal-optional-chaining"]
  },
  js: {
    presets: ["@babel/preset-env"]
  }
};
module.exports = api => {
  if (babelConfig[api.env()]) {
    return babelConfig[api.env()];
  }
};
// module.exports = {
//   presets: ["@babel/preset-env"],
//   plugins: ["transform-vue-jsx"]
// }
