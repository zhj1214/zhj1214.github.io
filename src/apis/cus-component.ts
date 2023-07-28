/*
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2023-07-28 15:36:57
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-07-28 15:38:48
 */
import request from "@/utils/http";

const api = {
  spTableMOck: "/demo/sptable",
  
};

export default api;

export function getSpTableMOck(parameter: AnyObject) {
  return request({
    url: api.spTableMOck,
    method: "post",
    data: parameter,
  });
}
