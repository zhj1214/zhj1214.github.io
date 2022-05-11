/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 1984-01-24 16:00:00
 * @LastEditors: zhj1214
 * @LastEditTime: 2021-11-23 10:42:11
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
