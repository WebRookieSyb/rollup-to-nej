const babelConfig = {
  vue: {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            browsers: ["defaults", "not ie <= 10"]
          }
        }
      ],
      [
        "@babel/preset-typescript"
      ]
    ],
    plugins: [
      "transform-vue-jsx",
      "@babel/proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator"
      // "@babel/plugin-external-helpers"
    ]
  }
  // js: {
  //   presets: ["@babel/preset-env"]
  // }
};
// module.exports = api => {
//   if (babelConfig[api.env()]) {
//     return babelConfig[api.env()];
//   }
// };
module.exports = api => {
  if (api.env('externalHelpers')) {
    babelConfig.vue.plugins.push("@babel/plugin-external-helpers")
  }
  return babelConfig.vue;
};
// module.exports = api => {
//   // 使用externalHelpers
//   const e = 1
//   // // 使用vue
//   const v = 2
//   console.log(11111)
//   if ((api.env()*1)&&e === 1) {
//     console.log(JSON.stringify(babelConfig.vue))
//     return babelConfig.vue;
//     // babelConfig.vue.plugins.push("@babel/plugin-external-helpers")
//   }

// };
// module.exports = {
//   presets: ["@babel/preset-env"],
//   plugins: ["transform-vue-jsx"]
// }
