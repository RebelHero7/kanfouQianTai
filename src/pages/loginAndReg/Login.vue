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

        <mt-field label="昵称"
                  style="margin-top: 1rem;"
                  placeholder="请输入昵称"
                   v-model="username"></mt-field>
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
                    @click="handleClick">登录</mt-button>



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
      }, 200);
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
            this.$router.go(-1);
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
  margin: 0 auto;
  h1 {
    font-size: 0.5rem;
    padding-top: 1rem;
    font-weight: bold;
    text-align: center;
  }
}
</style>
