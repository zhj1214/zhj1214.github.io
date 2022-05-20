/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-25 21:36:23
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-13 16:56:56
 */
import Mock from "mockjs";
import { builder, getBody } from "../util";

const username = ["admin", "super"];
// 强硬要求 ant.design 相同密码
// '21232f297a57a5a743894a0e4a801fc3',
const password = [
  "8914de686ab28dc22f30d3d8e107ff6c",
  "21232f297a57a5a743894a0e4a801fc3",
]; // admin, ant.design password

const login = (options: AnyObject) => {
  const body = getBody(options);
  console.log("mock: 登录账号密码", body);
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, "账户或密码错误", 401);
  }

  return builder(
    {
      id: Mock.mock("@guid"),
      name: Mock.mock("@name"),
      username: "admin",
      password: "",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png",
      status: 1,
      telephone: "",
      lastLoginIp: "27.154.74.117",
      lastLoginTime: 1534837621348,
      creatorId: "admin",
      createTime: 1497160610259,
      deleted: 0,
      roleId: "admin",
      lang: "zh-CN",
      token: "4291d7da9005377ec9aec4a71ea837f",
    },
    "",
    200,
    { "Custom-Header": Mock.mock("@guid") }
  );
};

const logout = () => {
  return builder({}, "[测试接口] 注销成功");
};

const smsCaptcha = () => {
  return builder({ captcha: Mock.mock("@integer(10000, 99999)") });
};

const twofactor = () => {
  return builder({ stepCode: Mock.mock("@integer(0, 1)") });
};
if (process.env.VUE_APP_ENABLE_LOCAL === "true") {
  Mock.mock(/\/auth\/login/, "post", login);
}

Mock.mock(/\/auth\/logout/, "post", logout);
Mock.mock(/\/account\/sms/, "post", smsCaptcha);
Mock.mock(/\/auth\/2step-code/, "post", twofactor);
