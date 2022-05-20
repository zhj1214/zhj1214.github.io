<template>
  <div class="login-container">
    <div id="login-three-container"></div>
    <div class="login-plane">
      <div class="login-plane-container">
        <img
          class="login-plane-human"
          src="@/assets/login/login_human.png"
          alt=""
        />
        <div class="login-plane-title">
          登陆
          <img
            class="login-plane-title-line"
            src="@/assets/login/login_horizontal_line.png"
            alt=""
          />
        </div>
        <div class="login-plane-form">
          <el-form :model="formField" :rules="formRules" ref="formRef">
            <el-form-item props="user">
              <el-input
                placeholder="用户名 / 账号"
                type="text"
                :default-value="formField.user"
                v-model="formField.user"
              ></el-input>
            </el-form-item>
            <el-form-item props="pass">
              <el-input
                placeholder="密码"
                type="password"
                :default-value="formField.user"
                v-model="formField.pass"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button
            @click="submitForm(formRef)"
            style="width: 100%"
            type="primary"
            >登录</el-button
          >
        </div>
      </div>
    </div>
    <div class="login-ground"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import md5 from "md5";
import useMethod from "@/store/hock/useMethod";
import { app } from "@/mixin";
import initThreejs from "./login";

export default defineComponent({
  setup() {
    // 表单对象
    const formRef = ref(null);

    // 响应式对象 - 表单对象
    const formField = reactive({
      user: "admin",
      pass: "aa123456",
      // code: "",
    });

    // 表单校验规则
    const formRules = {
      user: [{ required: true, message: "请输入用户名账号", trigger: "blur" }],
      pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
      // code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
    };

    onMounted(() => {
      initThreejs();
    });

    // 提交表单
    const submitForm = (formEl: any | undefined) => {
      console.log(formEl);
      if (!formEl) return;
      formEl.validate((valid: boolean) => {
        console.log(valid);
        if (valid) {
          submitHandle();
        } else {
          app().$message.warning("随便输入用户名、密码、验证码即可登陆");
        }
      });
    };

    // 登录提交请求
    const instance = app();
    const [actions] = useMethod("user", ["Login"]);
    const loginParams = {
      username: "admin",
      password: "8914de686ab28dc22f30d3d8e107ff6c",
    };
    loginParams.password = md5("admin");
    const loginSuccess = (res: any) => {
      console.log(instance, "login请求：", res);
      instance.$message.success("欢迎回来");
      instance.$router.push({ path: "/", query: { redirect: "/dashboard" } });
      // var appInstance = instance;
      // 延迟 1 秒显示欢迎信息
      // setTimeout(() => {

      // }, 1000);
    };
    const requestFailed = (err: any) => {
      console.log("login请求err：", err);
      app().$notifi.error({
        title: "错误",
        message:
          ((err.response || {}).data || {}).message ||
          "请求出现错误，请稍后再试",
        duration: 4,
      });
    };
    const submitHandle = async () => {
      actions
        .Login(loginParams)
        .then((res: any) => loginSuccess(res))
        .catch((err: any) => requestFailed(err))
        .finally(() => {
          console.log("登录方法执行结束");
        });
    };

    return {
      formRules,
      formField,
      submitForm,
      formRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  position: relative;
  #login-three-container {
    width: 100%;
    height: 100%;
  }
  .login-plane {
    position: absolute;
    z-index: 9999;
    width: 600px;
    height: 400px;
    background-image: url("@/assets/login/login_border.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-plane-container {
      width: 100%;
      height: 100%;
      border-radius: 18px;
      background-color: #007eff2e;
      position: relative;
      @keyframes humanMove {
        0% {
          top: -100px;
        }
        25% {
          top: -120px;
        }
        50% {
          top: -100px;
        }
        75% {
          top: -80px;
        }
        100% {
          background: -100px;
        }
      }
      .login-plane-human {
        position: absolute;
        width: 260px;
        right: -120px;
        top: -100px;
        animation: humanMove 8s linear 0s infinite normal;
      }
      .login-plane-title {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        font-size: 35px;
        color: #fff;
        font-weight: 700;
        img {
          width: 50%;
        }
        .login-plane-title-line {
          width: 80%;
          position: absolute;
          bottom: 0;
        }
      }
      .login-plane-form {
        padding: 45px 55px;
        box-sizing: border-box;
      }
    }
  }
  .login-ground {
    position: absolute;
    z-index: 9998;
    width: 100%;
    height: 400px;
    background-image: url("@/assets/login/ground.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    bottom: 0;
    left: 0;
  }
}
</style>
