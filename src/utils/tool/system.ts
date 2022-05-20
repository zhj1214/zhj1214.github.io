/*
 * @Description: 系统方法
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-09-04 09:36:08
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-13 13:45:08
 */
let uni: AnyObject;

export default {
  /**
   * 当前系统是不是iOS
   * */
  getCurrentSystemiOS() {
    // const app = getApp();
    // return app.globalData.iphoneInfo.platform === "ios";
  },

  /**
   * @description 判断当前系统
   */
  h5GetCurrentSystemiOS() {
    const u = navigator.userAgent;
    // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    return isiOS;
  },
  /**
   * 小程序重启（更新情况）
   */

  reboot() {
    const updateManager = uni.getUpdateManager();
    updateManager.applyUpdate();
  },

  /**
   * 官方提供的 版本号对比方法
   * 例子： compareVersion('1.11.0', '1.9.9') // 1
   */

  compareVersion(v1: string, v2: string) {
    const v11 = v1.split(".");
    const v22 = v2.split(".");
    const len = Math.max(v1.length, v2.length);

    while (v11.length < len) {
      v11.push("0");
    }

    while (v22.length < len) {
      v22.push("0");
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i]);
      const num2 = parseInt(v2[i]);

      if (num1 > num2) {
        return 1;
      }
      if (num1 < num2) {
        return -1;
      }
    }

    return 0;
  },

  /**
   * 小程序禁用
   * */

  appletDisable() {
    uni.reLaunch({
      url: "/pages/agreement/appletDisable",
      success: () => {
        uni.$alert.showToast("小程序已被禁用");
      },
    });
  },

  /**
   * @description 广告位跳转
   */
  adJumpUrl(linkAddress: string) {
    const arr = linkAddress.split("appleht");
    if (linkAddress.indexOf("http") !== -1) {
      uni.navigateTo({
        url: `/pagesA/out/out?src=${linkAddress}`,
      });
    } else if (arr.length === 2) {
      if (
        arr[1] === "/pages/all-goods/all-goods" ||
        arr[1] === "/pages/index/index" ||
        arr[1] === "/pages/cart/cart" ||
        arr[1] === "/pages/my/myPage"
      ) {
        uni.switchTab({
          url: arr[1],
        });
      } else {
        uni.navigateTo({
          url: arr[1],
        });
      }
    }
  },

  /**
   * @description 微信支付
   */

  weChatPay(param: AnyObject) {
    uni.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.packageInfo,
      signType: param.signType,
      paySign: param.paySign,
      success() {
        // 埋点 传入埋点类型  商品ids  页面路径 ADD_SHOPCART GOODS_EXCHANGE
        // const app = getApp().globalData;
        // uni.$sampling.sampling('GOODS_EXCHANGE', param.goodsIds, param.route);
        // uni.navigateTo({
        // 	url: '/pages/payment/pay-success/pay-success?payMoney=' + param.payMoney
        // });
        uni.reLaunch({
          url: "./settlementSuccess?isok=1",
        });
      },

      fail(err: any) {
        console.log(err);
        uni.reLaunch({
          url: "./settlementSuccess",
        });
      },
    });
  },
};
