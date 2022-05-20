/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-29 21:21:08
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-12 16:59:18
 */
import request from "@/utils/http";

const api = {
  user: "/user",
  role: "/role",
  service: "/service",
  permission: "/permission",
  permissionNoPager: "/permission/no-pager",
  orgTree: "/org/tree",
};

export default api;

export function getUserList(parameter: AnyObject) {
  return request({
    url: api.user,
    method: "get",
    params: parameter,
  });
}

export function getRoleList(parameter: AnyObject) {
  return request({
    url: api.role,
    method: "get",
    params: parameter,
  });
}

export function getServiceList(parameter: AnyObject) {
  return request({
    url: api.service,
    method: "get",
    params: parameter,
  });
}

export function getPermissions(parameter: AnyObject) {
  return request({
    url: api.permissionNoPager,
    method: "get",
    params: parameter,
  });
}

export function getOrgTree(parameter: AnyObject) {
  return request({
    url: api.orgTree,
    method: "get",
    params: parameter,
  });
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter: AnyObject) {
  return request({
    url: api.service,
    method: parameter.id === 0 ? "post" : "put",
    data: parameter,
  });
}

export function saveSub(sub: AnyObject) {
  return request({
    url: "/sub",
    method: sub.id === 0 ? "post" : "put",
    data: sub,
  });
}
