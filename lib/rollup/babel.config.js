const config = require("./config")
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

// 直接使用externalHelpers
// module.exports = api => {
//   if (api.env('externalHelpers')) {
//     babelConfig.vue.plugins.push("@babel/plugin-external-helpers")
//   }
//   return babelConfig.vue;
// };

// 位运算配置
module.exports = api => {
  // 转为数字
  const target = api.env() * 1;
  // 判断是否权限中有使用externalHelpers
  if ((target & config.useExternalHelpers) === config.useExternalHelpers) {
    babelConfig.vue.plugins.push("@babel/plugin-external-helpers")
  }
  return babelConfig.vue;

};
