<template>
    <div class="login">
        <mt-header title="">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <router-link to="/register" slot="right">
                <mt-button >注册</mt-button>
            </router-link>
        </mt-header>

        <h1>密码登录</h1>

        <div class="input">


            <van-cell-group>
                <van-field
                        v-model="username"
                        required
                        clearable
                        style="font-size: 16px"
                        label="用户名"
                        placeholder="请输入用户名"
                />
                <van-field
                        v-model="password"
                        required
                        style="font-size: 16px"
                        type="password"
                        label="密码"
                        placeholder="请输入不少于六位的密码"
                        :error-message="errorMessage"
                />


            </van-cell-group>
            <div class="tishi">还没有账号？可点击右上角进行注册哦~</div>

            <mt-button type="primary"
                       size="large"
                       style="margin-top: .6rem"
                       :disabled="disabled"
                       @click="handleClick">登录</mt-button>
        </div>

    </div>
</template>

<script>
import { Toast } from "mint-ui";
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      disabled: true,
      timer: null,
      toast: "",
      errorMessage: ""
    };
  },
  watch: {
    username() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.username) {
        this.disabled = true;
        return;
      }
      this.timer = setTimeout(() => {
        if (this.username.length < 1) {
          this.toast = "请输入您的用户名";
          Toast(this.toast);
        }
      }, 200);
    },
    password() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.password) {
        this.disabled = true;
        return;
      }
      this.timer = setTimeout(() => {
        if (this.password.length >= 6 && this.username.length > 0) {
          this.disabled = false;
          this.errorMessage = "";
        } else {
          this.disabled = true;
          this.errorMessage = "请输入至少6位的密码";
        }
      }, 300);
    }
  },
  methods: {
    handleUserInfo(res) {
      this.userInfo(res);
    },
    ...mapMutations(["userInfo"]),
    handleClick() {
      axios
        .post("/api/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          res = res.data;
          if (res.msg === undefined) {
            this.handleUserInfo(res);
            this.$router.push("/");
          } else {
            this.toast = res.msg;
            Toast({
              message: this.toast,
              duration: 3000
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  background-color: #fafafa;
  margin: 0 auto;
  h1 {
    font-size: 0.5rem;
    padding-top: 1rem;
    font-weight: bold;
    text-align: center;
  }
}
.input {
  margin-top: 1.2rem;
  .tishi {
    float: right;
    margin: 0.3rem;
    color: #999;
  }
}
</style>
