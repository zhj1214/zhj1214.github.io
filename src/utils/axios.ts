/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-29 21:22:05
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-12 16:28:20
 */
const VueAxios = {
  installed: false,
  vm: {},
  // eslint-disable-next-line no-unused-vars
  install(Vue: any, instance: any) {
    if (this.installed) {
      return;
    }
    this.installed = true;

    if (!instance) {
      // eslint-disable-next-line no-console
      console.error("You have to install axios");
      return;
    }

    Vue.axios = instance;

    Object.defineProperties(Vue.prototype, {
      axios: {
        get: function get() {
          return instance;
        },
      },
      $http: {
        get: function get() {
          return instance;
        },
      },
    });
  },
};

export default VueAxios;
