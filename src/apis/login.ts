/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-29 21:21:08
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-12 17:00:16
 */
import request from "@/utils/http";

const userApi = {
  Login: "/auth/login",
  Logout: "/auth/logout",
  ForgePassword: "/auth/forge-password",
  Register: "/auth/register",
  twoStepCode: "/auth/2step-code",
  SendSms: "/account/sms",
  SendSmsErr: "/account/sms_err",
  // get my info
  UserInfo: "/api/user/info",
  UserMenu: "/api/user/nav",
};

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter: AnyObject) {
  return request({
    url: userApi.Login,
    method: "post",
    data: parameter,
  });
}

export function getSmsCaptcha(parameter: AnyObject) {
  return request({
    url: userApi.SendSms,
    method: "post",
    data: parameter,
  });
}

export function getInfo() {
  return request({
    url: userApi.UserInfo,
    method: "get",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}

export function logout() {
  return request({
    url: userApi.Logout,
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step(parameter: AnyObject) {
  return request({
    url: userApi.twoStepCode,
    method: "post",
    data: parameter,
  });
}
