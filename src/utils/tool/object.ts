/*
 * @Description: 关于对象的方法
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-08-10 11:42:45
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-13 13:57:52
 */

/**
 * @description 对象去重
 * @param var x ={a:'2'}
 * @param var b ={a:'1'}
 * @example this.$Util.objectEquals(x, y) // false
 */
const objectEquals = function (x: any, y: any): boolean {
  const f1 = x instanceof Object;
  const f2 = y instanceof Object;
  if (!f1 || !f2) {
    return x === y;
  }
  if (Object.keys(x).length !== Object.keys(y).length) {
    return false;
  }
  const newX = Object.keys(x);
  for (let p in newX) {
    p = newX[p];
    const a = x[p] instanceof Object;
    const b = y[p] instanceof Object;
    if (a && b) {
      const equal: boolean = objectEquals(x[p], y[p]);
      if (!equal) {
        return equal;
      }
    } else if (x[p] != y[p]) {
      return false;
    }
  }
  return true;
};

/**
 * @description 数组去重
 * @param var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{},{a:'1',b:undefined,c:1,d:false,e:[{a:1,B:'1'}]},{a:'1',b:undefined,c:1,d:false,e:[{a:1,B:'1'}]}];
 * @example console.log(this.$Util.arrayUnique(arr));
 */
/* eslint no-extend-native: ["error", { "exceptions": ["Array,Date"] }] */
const arrayUnique = function (arr: any[]) {
  function unique(x: any, y: any) {
    if (isObjArr(x) == -1) {
      let f = false;
      x.forEach((item: any) => {
        objectEquals(item, y) ? (f = true) : false;
      });
      if (f) {
        return x;
      }
      const xx = x;
      const yy = isObjArr(y) == -1 ? y : [y];
      return [...xx, ...yy];
    }
    if (objectEquals(x, y)) {
      return isObjArr(x) == -1 ? x : [x];
    }
    const xx = isObjArr(x) == -1 ? x : [x];
    const yy = isObjArr(y) == -1 ? y : [y];
    return [...xx, ...yy];
  }

  const a = [...new Set(arr)];
  const c: any = [];
  const b = a.filter((item) => {
    if (typeof item !== "object") {
      c.push(item);
    }
    return item ? typeof item === "object" : false;
  });
  const d = b.reduce(unique);
  return !c ? d : !d ? c : [...c, ...d];
};

/**
 * @description 判断一个变量是否是数组;
 *  -1 value是数组
 *  1 value是对象
 *  0 value不是数组也不是对象
 * */
const isObjArr = function (value: any) {
  if (Object.prototype.toString.call(value) === "[object Array]") {
    return -1;
  }
  if (Object.prototype.toString.call(value) === "[object Object]") {
    return 1;
  }
  return 0;
};

export default {
  objectEquals,
  arrayUnique,

  /**
   * @description 深拷贝 templateData 是要复制的数组或对象，这样的数组或者对象就是指向新的地址的
   */
  copyDeep(templateData: AnyObject) {
    return JSON.parse(JSON.stringify(templateData));
  },

  /**
   * @description: 遍历所有类型
   * @param {*} obj 数据
   * @param {*} fn 遍历函数
   * @author: zhj1214
   */
  forEach(obj: any, fn: any) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isObjArr(obj) === 1) {
      for (let i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  },
};
