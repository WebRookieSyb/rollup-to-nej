const config = require("./config");
const babelConfig = {
  vue: {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            browsers: ["defaults", "not ie <= 10"],
          },
        },
      ],
      ["@babel/preset-typescript"],
    ],
    plugins: [
      "transform-vue-jsx",
      "@babel/proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
    ],
  },
  react: {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            browsers: ["defaults", "not ie <= 10"],
          },
        },
      ],
      ["@babel/preset-typescript"],
      ["@babel/preset-react"],
    ],
    plugins: [
      "@babel/proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-class-properties",
    ],
  },
  js: {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            browsers: ["defaults", "not ie <= 10"],
          },
        },
      ],
      ["@babel/preset-typescript"],
    ],
    plugins: [
      "@babel/proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
    ],
  },
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
module.exports = (api) => {
  // 转为数字
  const target = api.env() * 1;
  let result = babelConfig.js;
  // 判断是否是vue
  if ((target & config.useVue) === config.useVue) {
    result = babelConfig.vue;
  } else if((target & config.useReact) === config.useReact) {
    result = babelConfig.react;
  }

  // 判断是否权限中有使用externalHelpers
  if ((target & config.useExternalHelpers) === config.useExternalHelpers) {
    result.plugins.push("@babel/plugin-external-helpers");
  }
  console.log(result);
  return result;
};
