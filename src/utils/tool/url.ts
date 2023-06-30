/*
 * @Description: 关于URL的工具类
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-09-04 09:35:16
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-06-30 10:27:04
 */

/** URL 解析 * */
export default {
  /**
   *  @description url 参数解析
   */
  getUrlParams(names: string, urlSearch = window.location.href) {
    const urlObj = new URL(urlSearch);
    if (!urlObj.searchParams.get(names)) {
      const hasnObj = new URL(window.location.hash);
      return hasnObj.searchParams.get(names);
    }
    return urlObj.searchParams.get(names);
  },
};
