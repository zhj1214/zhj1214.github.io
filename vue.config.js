const { defineConfig } = require("@vue/cli-service");
const IS_PROD = ["production"].includes(process.env.NODE_ENV);
const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
const productionGzipExtensions = /\.(ts|js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    // 需要 npm i -D compression-webpack-plugin
    const plugins = [];
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },

  chainWebpack: (config) => {
    // 添加别名 这里没生效
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@utils", resolve("src/utils"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@store", resolve("src/store"));
  },
  devServer: {
    host: "localhost",
    port: 23000, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    proxy: {
      //配置多个跨域
      "/menu": {
        target: "http://10.50.0.173:7001",
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/menu": "/menu",
        },
      },
    },
  },
});
