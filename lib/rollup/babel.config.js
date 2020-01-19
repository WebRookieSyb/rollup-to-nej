const babelConfig = {
  vue: {
    presets: ["@babel/preset-env"],
    plugins: [
      "transform-vue-jsx",
      "@babel/proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator"
    ]
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
