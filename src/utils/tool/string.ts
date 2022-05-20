/*
 * @Description: 字符春方法
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-09-04 09:37:24
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-13 13:25:56
 */

export default {
  /** 参数说明：
   * @description 根据长度截取先使用字符串，超长部分追加…
   * @param str 对象字符串
   * @param len 目标字节长度
   * @returns 处理结果字符串
   */
  cutString(str: string, len: string) {
    // length属性读出来的汉字长度为1
    if (str.length * 2 <= Number(len)) {
      return str;
    }
    let strlen = 0;
    let s = "";
    for (let i = 0; i < str.length; i++) {
      s += str.charAt(i);
      if (str.charCodeAt(i) > 128) {
        strlen += 2;
        if (Number(strlen) >= Number(len)) {
          return `${s.substring(0, s.length - 1)}...`;
        }
      } else {
        strlen += 1;
        if (Number(strlen) >= Number(len)) {
          return `${s.substring(0, s.length - 2)}...`;
        }
      }
    }
    return s;
  },

  /**
   * @description 千分位
   */
  numberFormat(num: string) {
    const reg = /\d{1,3}(?=(\d{3})+$)/g;
    return `${num}`.replace(reg, "$&,");
  },
};
