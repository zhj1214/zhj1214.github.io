/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-09-04 09:53:42
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-07-28 15:30:39
 */
let uni: AnyObject;
let tool = {
  /**
   * @description 手机号加密
   */
  phoneEncryption(phone: string) {
    return phone.replace(/(\d{3})\d*(\d{4})/, "$1****$2");
  },

  /**
   * 是否是身份证
   * @param {*} params
   * @returns
   */
  isIDCard(params: any) {
    return /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/.test(
      params
    );
  },
  /**
   * @description 根据身份证号获取 生日
   */
  getBirthdayFromIdCard(idCard: any) {
    let birthday = "";
    if (idCard !== null && idCard !== "") {
      if (idCard.length === 15) {
        birthday = `19${idCard.substr(6, 6)}`;
      } else if (idCard.length === 18) {
        birthday = idCard.substr(6, 8);
      }
      birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
    }
    return birthday;
  },
  /**
   * @description 根据身份证号获取 性别
   */
  getSexFromIdCard(idCard: any) {
    if (idCard !== undefined && idCard !== "") {
      const sexIndex = idCard.substr(idCard.length - 2, 1);
      if (Number(sexIndex) % 2 === 0) {
        return "女";
      }
      return "男";
    }
  },
  /**
   * @description 根据 生日 获取 年龄
   */
  getAgeFromBirthday(val: any) {
    if (val === null || val === "" || val === undefined) {
      return "";
    }
    const cDate = new Date(val);
    return `${new Date().getFullYear() - parseInt(`${cDate.getFullYear()}`)}`;
  },
  /**
   * 校验手机号
   * @description https://github.com/VincentSit/ChinaMobilePhoneNumberRegex/blob/master/README-CN.md
   */
  validatePhone(num: any) {
    return /^1[3456789]\d{9}$/.test(num);
  },

  /**
   * 保留两位小数
   * param： 数值
   * isRounding 是否四舍五入
   * RegExp 中 \ => \\
   * */

  decimalTwo(param: any, isRounding = false, digit = 2) {
    if (isRounding) {
      if (typeof param === "string") {
        param = Number(param);
      }

      return param.toFixed(digit);
    }
    const re = new RegExp(`^\\d+(?:\\.\\d{0,${digit}})?`);

    if (typeof param === "number") {
      param = param.toString();
    }

    return Number(param.match(re));
  },

  /**
   * 图片旋转
   * @param angle 角度
   * */
  pictureRotation(angle: any) {
    const animation = uni.createAnimation({
      duration: 1,
      timingFunction: "linear",
      // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 1,
      transformOrigin: "50% 50% 0",
    });
    animation.rotate(180 * angle).step();
    return animation;
  },

  /**
   * 下载文件-h5
   * @param {fileName: string, fileLink: string}
   */
  downLoadFile(val: any) {
    const downloadEl = document.createElement("a");
    downloadEl.download = val.fileName;
    downloadEl.href = val.fileUrl;
    document.body.appendChild(downloadEl);
    downloadEl.click();
    downloadEl.remove();
  },

  /**
   * 是否是图片链接
   * @param {string} imgUrl
   * @returns
   */
  isImgUrl(imgUrl: any) {
    const imgArr = ["png", "jpg", "jpeg", "gif"];
    return imgArr.includes(
      imgUrl.slice(imgUrl.lastIndexOf(".") + 1).toLowerCase()
    );
  },

  /**
   * 创建单利
   * */
  Proxy(func: any) {
    let instance: any;
    const handler = {
      construct(target: any, args: any) {
        if (!instance) {
          instance = Reflect.construct(func, args);
        }
        return instance;
      },
    };
    return new Proxy(func, handler);
  },

  /**
   * 优雅的处理 async/await
   * let [err,res] = await errorCaptured(asyncFunc)
   * */
  async errorCaptured(asyncFunc: any) {
    try {
      const res = await asyncFunc();
      return [null, res];
    } catch (e) {
      return [e, null];
    }
  },

  /**
   * @description 函数防抖
   * @param {Function} func -需要函数防抖的函数
   * @param {Number} time -延迟时间
   * @param {Options} options -配置项
   * @return {Function} -经过防抖处理的函数
   * 配置项
   * @typedef {Object} Options -配置项
   * @property {Boolean} leading -开始是否需要额外触发一次
   * @property {Boolean} trailing -结束后是否需要额外触发一次
   * @property {this} context -上下文
   * */

  debounce(
    func: any,
    time = 1000,
    options = {
      leading: true,
      context: null,
    }
  ) {
    let timer: any;
    const _debounce = (...args: any) => {
      if (timer) {
        clearTimeout(timer);
      }

      // -开始是否需要触发一次
      if (options.leading) {
        const callNow = !timer;
        timer = setTimeout(function () {
          timer = null;
        }, time);
        if (callNow)
          typeof func === "function" && func.apply(options.context, args);
      } else {
        // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时time毫秒后执行func回调方法
        timer = setTimeout(function () {
          typeof func === "function" && func.apply(options.context, args);
        }, time);
      }
    };
    /**
     * @description 取消函数
     * @see https://juejin.im/post/5931561fa22b9d0058c5b87d
     * */
    _debounce.cancel = () => {
      clearTimeout(timer);
      timer = null;
    };
    return _debounce;
  },

  /**
   * @description: 判断是不是IE浏览器
   * @author: zhj1214
   */
  isIE() {
    const bw = window.navigator.userAgent;
    const compare = (s: any) => bw.indexOf(s) >= 0;
    const ie11 = (() => "ActiveXObject" in window)();
    return compare("MSIE") || ie11;
  },
  // 判断 string array object 是不是为空
  isEmpty(val: any) {
    const isString = Object.prototype.toString.call(val) === `[object String]`;
    const isArray = Object.prototype.toString.call(val) === `[object Array]`;
    const isObject = Object.prototype.toString.call(val) === `[object Object]`;
    return (
      (isString && val.trim() === "") ||
      val === undefined ||
      val === null ||
      (isArray && val.length === 0) ||
      (isObject && Object.keys(val).length === 0)
    );
  },
};

// 遍历出每个组件的路径
const requireTool = require.context("../tool", false, /\.js$/); // webpack
requireTool.keys().forEach((path: string) => {
  const jsInstance = requireTool(path);
  if (!path.includes("index")) {
    tool = { ...tool, ...jsInstance.default };
  }
});
// const requireTool = import.meta.globEager("../tool/*.js"); // vite
// for (const key in requireTool) {
//   if (Object.prototype.hasOwnProperty.call(requireTool, key)) {
//     const jsInstance = requireTool[key];
//     if (!key.includes("index")) {
//       tool = { ...tool, ...jsInstance.default };
//     }
//   }
// }

export default tool;
