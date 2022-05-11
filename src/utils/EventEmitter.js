/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2020-12-22 04:00:57
 * @LastEditors: zhj1214
 * @LastEditTime: 2021-11-17 16:18:53
 */
/**
 * 通过 on 方法注册事件，trigger 方法触发事件，来达到事件之间的松散解耦，并且额外添加了 once 和 off 辅助函数用于注册只触发一次的事件以及注销事件
 * promisify
 * */
export default {
  constructor() {
    this.subs = {};
    this.delegates = {};
  },

  on(event, cb) {
    (this.subs[event] || (this.subs[event] = [])).push(cb);
  },

  trigger(event, ...args) {
    this.subs[event] &&
      this.subs[event].forEach((cb) => {
        cb(...args);
      });
  },

  once(event, onceCb) {
    const cb = (...args) => {
      onceCb(...args);
      this.off(event, onceCb);
    };
    this.on(event, cb);
  },

  off(event, offCb) {
    if (this.subs[event]) {
      let index = this.subs[event].findIndex((cb) => cb === offCb);
      this.subs[event].splice(index, 1);
      if (!this.subs[event].length) delete this.subs[event];
    }
  },
  // 代理模式
  delegate(key, cb) {
    if (!this.delegates[key]) {
      (this.delegates[key] = []).push(cb);
    } else if (typeof this.delegates[key] === "function") {
      let val = this.delegates[key]();
      val.unshift(key);
      (this.delegates[key] = []).push(cb);
      this.emit.apply(this, val);
    }
  },
  emit(key, ...args) {
    if (this.delegates[key] && typeof this.delegates[key] !== "function") {
      this.delegates[key].forEach((cb) => {
        cb(...args);
      });
    } else {
      this.delegates[key] = () => JSON.parse(JSON.stringify(args));
    }
  },
};
/**
 * 例子
 * */
// 触发通知
// this.$eventEmitter.trigger("onectGetUserinfo")
// 接收器
// var self = this;
// this.$eventEmitter.on("onectGetUserinfo", () => {
// 	self.getHomeMemberInfo();
// 	self.initData();
// });
