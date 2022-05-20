/*
 * @Description: 函数装饰器
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-09-04 09:51:15
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-13 14:21:22
 */

Function.prototype.before = function (beforefn: any): any {
  const self = this; // 保存原函数引用
  return function (this: any, ...arg: any) {
    // 返回包含了原函数和新函数的 '代理函数'
    const rtr = beforefn.apply(this, arg) || {}; // 执行新函数，修正this
    const args = Array.from(arg);
    args.push(rtr);
    return self.apply(this, args); // 执行原函数
  };
};

Function.prototype.after = function (afterfn: any): any {
  const self = this;
  return function (this: any, ...arg: any) {
    const ret = self.apply(this, arg);
    const args = Array.from(arg);
    args.push(ret);
    afterfn.apply(this, args);
    return ret;
  };
};

// @example:
// var func = function () {
//   console.log('2', arguments)
// }
// //func1和func3为挂载函数
// var func1 = function () {
//   console.log('1')
//   return { a: 111 }
// }
// var func3 = function () {
//   console.log('3')
// }
// func = func.before(func1).after(func3)
// func('1234567')
