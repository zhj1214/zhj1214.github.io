/*
 * @Description: 关于URL的工具类
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-09-04 09:35:16
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-13 11:24:10
 */

/** URL 解析 * */
import urlFormat from "querystring";
import Url from "url";

export default {
  /**
   *  @description url 参数解析
   */
  getUrlParams(names: string, urlSearch = window.location.href) {
    if (Url.parse) {
      const urlParam = Url.parse(urlSearch);
      const urlObj = urlFormat.parse(urlParam.query || "");
      if (!urlObj[names]) {
        const hashObj = urlFormat.parse(urlParam.hash || "");
        for (const idx in Object.keys(hashObj)) {
          const key = Object.keys(hashObj)[idx];
          if (typeof key === "string") {
            if (key.indexOf("?") !== -1) {
              if (key.split("?")[1] === names) {
                return hashObj[key];
              }
            }
          }
        }
        return hashObj[names];
      }
      return urlObj[names];
    }
    const urlObj = new URL(urlSearch);
    if (!urlObj.searchParams.get(names)) {
      const hasnObj = new URL(window.location.hash);
      return hasnObj.searchParams.get(names);
    }
    return urlObj.searchParams.get(names);
  },
};
