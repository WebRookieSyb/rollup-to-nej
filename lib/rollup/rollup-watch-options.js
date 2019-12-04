module.exports = input => ({
  include: input + "/**", // 监听的文件夹
  exclude: "node_modules/**" // 排除监听的文件夹
});
