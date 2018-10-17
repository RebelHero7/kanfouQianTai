<template>
    <div>
    <mt-header title="">
        <router-link to="/loginAndReg" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <div class="login">
        <h1>注册</h1>
        <mt-field label="昵称"
                  placeholder="请输入昵称"
                  v-model="username"
        ></mt-field>
        <mt-field
                label="密码"
                placeholder="请输入密码"
                type="password"
                v-model="password"
        ></mt-field>


        <mt-button type="primary"
                   size="large"
                   style="margin-top: .6rem"
                   :disabled="disabled"
                   @click="handleClick">注册</mt-button>
    </div>
</div>
</template>

<script>
import { Toast } from "mint-ui";
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      disabled: true,
      timer: null,
      toast: ""
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
          this.toast = "请输入昵称";
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
        if (this.password.length >= 6 && this.username.length !== 0) {
          this.disabled = false;
        } else {
          this.disabled = true;
          this.toast = "请输入至少6位的密码";
          Toast(this.toast);
        }
      }, 500);
    }
  },
  methods: {
    handleClick() {
      axios
        .post("/api/reg", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          res = res.data;
          if (res === "ok") {
            this.toast = "注册成功";
            Toast({
              message: this.toast,
              duration: 5000
            });
            this.$router.push({ path: "/" });
          } else {
            this.toast = res;
            Toast({
              message: this.toast,
              duration: 5000
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 75%;
  margin: 0 auto;
  h1 {
    font-size: 0.5rem;
    font-weight: bold;
    padding: 1rem 0;
    text-align: center;
  }
}
</style>
