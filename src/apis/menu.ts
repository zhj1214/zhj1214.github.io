/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-12-15 16:24:56
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-12 16:59:00
 */
import request from "@/utils/http";

const api = {
  add: "/menu/add",
  update: "/menu/update",
  remove: "/menu/remove",
  info: "/menu/info",
  list: "/menu/list",
};

export default api;

export function addMenuInfo(parameter: AnyObject) {
  // return Promise.reject();
  return request({
    url: api.add,
    method: "post",
    data: parameter,
  });
}

export function updateMenuInfo(parameter: AnyObject) {
  // return Promise.reject();
  return request({
    url: api.update,
    method: "post",
    data: parameter,
  });
}

export function deleteMenu(parameter: AnyObject) {
  // return Promise.reject();
  return request({
    url: api.remove,
    method: "get",
    params: parameter,
  });
}

export function getMenuInfo(parameter: AnyObject) {
  return request({
    url: api.info,
    method: "get",
    params: parameter,
  });
}

export function getMenuList(parameter: AnyObject) {
  // return Promise.reject();
  return request({
    url: api.list,
    method: "get",
    params: parameter,
  });
}