const { defineConfig } = require("@vue/cli-service");
const UploadSourceMapPlugin = require("./public/uploadSourceMapPlugin");
const IS_PROD = ["production"].includes(process.env.NODE_ENV);
const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
const productionGzipExtensions = /\.(ts|js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入

module.exports = defineConfig({
  // 生产环境是否生成 sourceMap 文件，默认 true
  productionSourceMap: true,
  transpileDependencies: true,
  css: {
    // 开启 CSS source maps，一般不建议开启
    sourceMap: true,
    loaderOptions: {
      sass: {
        // 1. 必须写在UI组件之前，避免以避免 sass 混合变量的问题（官方）https://element-plus.org/zh-CN/guide/theming.html#%E5%A6%82%E4%BD%95%E8%A6%86%E7%9B%96%E5%AE%83%EF%BC%9F
        // 2。加载mixin的样式
        additionalData: `@use "./src/styles/element/index.scss" as *;`,
      },
    },
  },
  configureWebpack: (config) => {
    // 需要 npm i -D compression-webpack-plugin
    const plugins = [];
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path][name].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        }),
        new UploadSourceMapPlugin()
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  chainWebpack: (config) => {
    // 添加别名 这里没生效
    config.resolve.alias
      // .set("@", resolve("src"))
      .set("utils", resolve("src/utils"))
      .set("@assets", resolve("src/assets"))
      .set("@style", resolve("src/style"))
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
        target: "http://127.0.0.1:7001", // 本地服务
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/menu": "/menu",
        },
      },
      "/errors": {
        target: "http://localhost:7001", // 本地服务
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/errors": "/errors",
        },
      },
    },
  },
});
