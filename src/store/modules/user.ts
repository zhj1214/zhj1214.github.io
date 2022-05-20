import { STORAGE } from "@/utils/constant";
import { localStorage } from "@/utils/localStorage";
import { login, getInfo, logout } from "@/apis/login";

const welcome = () => {
  const arr = [
    "休息一会儿吧",
    "准备吃什么呢?",
    "要不要打一把 DOTA",
    "我猜你可能累了",
  ];
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

export default {
  namespaced: true,
  state: {
    token: "",
    name: "",
    welcome: "",
    avatar: "",
    roles: [],
    info: {},
  },

  mutations: {
    SET_TOKEN: (state: AnyObject, token: any) => {
      state.token = token;
    },
    SET_NAME: (state: AnyObject, param: AnyObject) => {
      state.name = param.name;
      state.welcome = param.welcomeValue;
    },
    SET_AVATAR: (state: AnyObject, avatar: any) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state: AnyObject, roles: any) => {
      state.roles = roles;
    },
    SET_INFO: (state: AnyObject, info: any) => {
      state.info = info;
    },
  },

  actions: {
    // 登录
    Login(context: AnyObject, userInfo: AnyObject) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((response: AnyObject) => {
            const { data } = response;
            // const num = 7 * 24 * 60 * 60 * 1000;
            localStorage.setItem(STORAGE.TOKEN, data.token);
            context.commit("SET_TOKEN", data.token);
            resolve(data);
          })
          .catch((error: AnyObject) => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo(context: AnyObject) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((response: AnyObject) => {
            const { data } = response;

            if (data.role && data.role.permissions.length > 0) {
              const { role } = data;
              role.permissions = data.role.permissions;
              role.permissions.map((per: AnyObject) => {
                if (
                  per.actionEntitySet != null &&
                  per.actionEntitySet.length > 0
                ) {
                  const action = per.actionEntitySet.map((act: AnyObject) => {
                    return act.action;
                  });
                  per.actionList = action;
                }
              });
              role.permissionList = role.permissions.map(
                (permission: AnyObject) => {
                  return permission.permissionId;
                }
              );
              context.commit("SET_ROLES", data.role);
              context.commit("SET_INFO", data);
            } else {
              debugger;
              reject(new Error("getInfo: roles must be a non-null array !"));
            }

            context.commit("SET_NAME", { name: data.name, welcome: welcome() });
            context.commit("SET_AVATAR", data.avatar);

            resolve(response);
          })
          .catch((error: AnyObject) => {
            reject(error);
          });
      });
    },

    // 登出
    Logout(context: AnyObject) {
      return new Promise<void>((resolve) => {
        logout()
          .then(() => {
            context.commit("SET_TOKEN", "");
            context.commit("SET_ROLES", []);
            localStorage.removeItem(STORAGE.TOKEN);
            resolve();
          })
          .catch((err: AnyObject) => {
            console.log("logout fail:", err);
            // resolve()
          });
      });
    },
  },
};
