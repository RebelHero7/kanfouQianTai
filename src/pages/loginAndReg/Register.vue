<template>
    <div style="background-color: #FAFAFA">
    <mt-header title="" style="font-size:18px">
        <router-link to="/loginAndReg" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <div class="reg">
        <h1>注册</h1>

        <div class="info">
            <van-cell-group>
                <van-field
                        v-model="username"
                        required
                        clearable
                        style="font-size: 16px"
                        label="用户名"
                        placeholder="请输入用户名"
                        :error-message="userMessage"
                />
            </van-cell-group>
        </div>


        <div class="info">
            <van-cell-group>
                <van-field
                        v-model="password"
                        required
                        style="font-size: 16px"
                        type="password"
                        label="密码"
                        placeholder="请输入不少于六位的密码"
                        :error-message="errorMessage"
                />
                <van-field
                        v-model="confirmPassword"
                        required
                        style="font-size: 16px"
                        type="password"
                        label="确认密码"
                        placeholder="请再次输入密码"
                        :error-message="confirmMessage"
                />

            </van-cell-group>
        </div>

        <div class="info" >
            <div style="font-size: 16px; margin-bottom: .2rem">请选择您的性别</div>
            <van-radio-group v-model="radio" >
                <van-cell-group>
                    <van-cell title="男" clickable @click="radio = '1'" style="font-size: 16px">
                        <van-radio name="1" />
                    </van-cell>
                    <van-cell title="女" clickable @click="radio = '0'" style="font-size: 16px">
                        <van-radio name="0" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>

        <div class="info">

            <van-cell-group>
                <van-field
                        v-model="introduction"
                        style="font-size: 16px"
                        label="简介"
                        type="textarea"
                        placeholder="一句话介绍自己吧~"
                        rows="1"
                        autosize
                />
            </van-cell-group>
        </div>


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
      confirmPassword: "",
      disabled: true,
      timer: null,
      toast: "",
      errorMessage: "",
      confirmMessage: "",
      userMessage: "",
      introduction: "",
      radio: "1"
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
          this.userMessage = "请输入您想注册的用户名";
        } else {
          axios.get("/api/userExist?userName=" + this.username).then(res => {
            res = res.data;
            //表示用户名存在
            if (res === 1) {
              this.userMessage = "该用户名已存在，请换一个";
            } else {
              this.userMessage = "";
            }
          });
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
        if (this.password.length < 6) {
          this.errorMessage = "请输入至少6位的密码";
        } else {
          this.errorMessage = "";
        }
      }, 500);
    },
    confirmPassword() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.password) {
        this.disabled = true;
        return;
      }
      this.timer = setTimeout(() => {
        if (this.password === this.confirmPassword) {
          this.disabled = false;
          this.confirmMessage = "";
        } else {
          this.disabled = true;
          this.confirmMessage = "两次输入密码不一致";
        }
      }, 500);
    }
  },
  methods: {
    handleClick() {
      axios
        .post("/api/reg", {
          username: this.username,
          password: this.password,
          introduction: this.introduction,
          sex: this.radio
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
.reg {
  margin: 0 auto;
  h1 {
    font-size: 0.5rem;
    font-weight: bold;
    padding: 1rem 0 0.5rem;
    text-align: center;
  }
  .info {
    margin-top: 0.5rem;
  }
}
</style>
