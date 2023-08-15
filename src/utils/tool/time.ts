/*
 * @Description:时间的方法
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-09-04 09:36:40
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-08-15 15:33:27
 */
import "../base/date";

export default {
  /**
   * @description 时间戳转时间
   * @param format 时间格式
   * @param date   时间戳 默认当前时间
   * @example (new Date()).Format("YYYY-MM-DD HH:mm:ss.S")
   * */
  getTimeFormat(date: any, format = "YYYY-MM-DD HH:mm:ss.S") {
    if (!date) return "";
    let time = null;
    if (Object.prototype.toString.call(date) === "[object Date]") {
      time = date;
    } else if (typeof date === "string") {
      time = new Date(Number(date));
    } else {
      time = new Date(date);
    }
    return time.Format(time, format);
  },
  /**
   * @description 公共方法定义文件，需要使用时可以在js文件中按需引入
   */

  formatTime(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    function formatNumber(val: number) {
      const n = val.toString();
      return n[1] ? n : `0${n}`;
    }
    return `${[year, month, day].map((e) => formatNumber(e)).join("/")} ${[
      hour,
      minute,
      second,
    ]
      .map((e) => formatNumber(e))
      .join(":")}`;
  },

  /**
   * @description 计算两个时间  时间间隔
   * @param time1  开始时间 YYYY-MM-DD HH:mm:ss 时间格式  必填
   * @param time2  结束时间 YYYY-MM-DD HH:mm:ss 时间格式  默认当前时间
   * */
  /* eslint prefer-promise-reject-errors: "error" */
  calculateAtoBtimeDifference(time1: string, time2 = new Date()) {
    if (!time1) {
      return 0;
    }

    return new Promise(function (resolve, reject) {
      const w: AnyObject = window as AnyObject;
      if (w.currentiOSSystem) {
        const time0 = time2.Format("YYYY-MM-DD HH:mm:ss");
        const end = new Date(time0.replace(/-/g, "/")).getTime();
        const star = new Date(time1.replace(/-/g, "/")).getTime();
        if (!isNaN(end) && !isNaN(star)) {
          resolve((end - star) / 1000);
        }
      } else {
        const d1 = new Date(time1);
        time2 = time2 || new Date();
        const d2 = new Date(time2);
        const difference = parseInt(`${d2.getTime() - d1.getTime()}`);
        if (
          difference != undefined &&
          difference != null &&
          !isNaN(difference)
        ) {
          resolve(difference / 1000);
        }
      }
    });
  },
};
