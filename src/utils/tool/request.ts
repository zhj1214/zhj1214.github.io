/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-09-04 09:55:50
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-13 13:47:13
 */
let uni: AnyObject;

export default {
  /**
   * 必填字段 校验
   * */
  requiredInfo() {
    if (!uni.$localStorage.getItem("Token")) return;
    uni.$api
      .apiRequest("userRegistKey", {
        orgId: uni.$localStorage.getItem("userOrgId"),
        memberId: uni.$localStorage.getItem("memberId"),
      })
      .then((res: AnyObject) => {
        if (res.code === 10000 && res.data) {
          let isRequired = true;
          res.data.forEach((item: AnyObject) => {
            if (
              item.requiredFields === 1 &&
              item.value !== 0 &&
              (item.value === undefined || item.value === "")
            ) {
              console.log(item);
              isRequired = false;
            }
          });

          if (!isRequired) {
            uni.navigateTo({
              url: "/pages/login/registered/registerednew?isExchangeCoupon=1",
              success: () => {
                console.log("请先完善必填信息");
                uni.$alert.showToast("请先完善必填信息");
              },
            });
          }
        }
      });
  },

  /**
   * 获取省市区
   * @description
   */
  getAreaData(response: any) {
    uni.$api
      .apiRequest("getlocaltionSever", {
        isContainForeign: -1,
      })
      .then((res: AnyObject) => {
        if (res.code === 10000 && res.data) {
          response({
            province_list: res.data.provinceList,
            city_list: res.data.cityList,
            county_list: res.data.countyList,
          });
        }
      });
  },

  /**
   * @description 获取用户信息
   */

  getMemberInfo() {
    return new Promise<void>((resolve) => {
      if (uni.$localStorage.getItem("Token")) {
        uni.$api.apiRequest("getHomeMemberInfo").then((res: AnyObject) => {
          if (res.code === 10000 && res.data) {
            // 更新本地用户信息
            uni.$localStorage.setCurrentUser(res.data);
            resolve(res.data);
          } else if (uni.$localStorage.getCurrentUser()) {
            resolve(uni.$localStorage.getCurrentUser());
          }
        });
      } else {
        resolve();
      }
    });
  },

  

  /**
   * 后台获取的城市数据进行转换
   * 转换成可用的城市数据
   * */
//   serveToCityData(area) {
//     const ssqList = [];
//     // 处理省份
//     for (const k in area.province_list) {
//       ssqList.push({
//         value: k,
//         label: area.province_list[k],
//         children: [],
//       });
//     }
//     // 处理城市
//     ssqList.forEach((sf, index) => {
//       const csList = [];
//       if (index + 1 <= ssqList.length) {
//         let sf_next;
//         if (index + 1 < ssqList.length) {
//           sf_next = ssqList[index + 1];
//         }
//         for (const k in area.city_list) {
//           if (k >= sf.value && k <= (sf_next ? sf_next.value : k + 10000)) {
//             csList.push({
//               value: k,
//               label: area.city_list[k],
//               children: [],
//             });
//           }
//         }
//       }
//       sf.children = csList;
//     });
//     // 处理地区
//     ssqList.forEach((sf, sf_index) => {
//       const cs_list = sf.children;
//       let sf_next;
//       if (sf_index + 1 < ssqList.length) {
//         sf_next = ssqList[sf_index + 1];
//       }
//       cs_list.forEach((cs, cs_index) => {
//         const dqList = [];
//         if (cs_index + 1 <= cs_list.length) {
//           let cs_next;
//           if (cs_index + 1 < cs_list.length) {
//             cs_next = cs_list[cs_index + 1];
//           }
//           for (const k in area.county_list) {
//             if (
//               k >= cs.value &&
//               k <
//                 (cs_next ? cs_next.value : sf_next ? sf_next.value : k + 10000)
//             ) {
//               dqList.push({
//                 value: k,
//                 label: area.county_list[k],
//               });
//             }
//           }
//         }
//         cs.children = dqList;
//       });
//     });
//     // console.error(JSON.stringify(ssqList))
//     return ssqList;
//   },
// };