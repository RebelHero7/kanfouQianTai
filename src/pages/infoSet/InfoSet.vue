<template>
    <div class="info-set">
        <mt-header title="个人信息设置" style="font-size:18px">
            <mt-button icon="back" slot="left" @click="handleBack">返回</mt-button>
        </mt-header>

        <div class="userInfo">
            <span class="item-name">头像</span>
            <span class="item"><img :src="user.headUrl" class="item-img" @click="changeHeadUrl"/></span>

            <van-actionsheet
                v-model="show"
                :actions="actions"
                @select="onSelect"
                cancel-text="取消"
            />
            <input id="img-upload-input" type="file" @change="getFile($event)" style="display: none">
        </div>


        <div class="relatedQue">
            <van-cell-group>
                <van-cell title="用户名" :value="user.name"  style="font-size:16px;" @click="handleName"/>
                <van-cell title="性别" :value="user.sex == 0 ? '女' : '男' "  @click="showSex" style="font-size:16px;"/>
            </van-cell-group>

            <van-dialog
                    v-model="sexShow"
                    show-cancel-button
                    @confirm="changeSex"
                    :before-close="beforeClose"
            >
                <van-radio-group v-model="radio">
                    <van-cell-group>
                        <van-cell title="女" clickable @click="radio = '0'">
                            <van-radio name="0" />
                        </van-cell>
                        <van-cell title="男" clickable @click="radio = '1'">
                            <van-radio name="1" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </van-dialog>
        </div>

        <div class="relatedQue" >

            <van-panel title="个人简介">
                <div class="intro" @click="showIntro">{{user.introduction}}</div>
            </van-panel>

            <van-dialog
                    v-model="introductionShow"
                    show-cancel-button
                    confirmButtonText="修改"
                    @confirm="changeIntroduction"
                    :before-close="beforeClose"
            >
                <van-cell-group>
                    <van-field
                            v-model="newIntro"
                            type="textarea"
                            placeholder="一句话介绍你自己吧~"
                            label="个人简介"
                            rows="1"
                            autosize
                    />
                </van-cell-group>
            </van-dialog>
        </div>


        <div class="relatedQue">
            <van-button  size="large" @click="showPassWord">修改密码</van-button>

            <van-dialog
                    v-model="oldPasswordShow"
                    show-cancel-button
                    confirmButtonText="确认"
                    @confirm="isOldPass"
                    :before-close="beforeClose"
            >
                <van-field
                        v-model="oldPassword"
                        type="password"
                        label="密码"
                        placeholder="请输入旧密码"
                        required
                />

            </van-dialog>
            <van-dialog
                    v-model="newPasswordShow"
                    show-cancel-button
                    confirmButtonText="确认"
                    @confirm="changePassword"
                    :before-close="beforeClose"
            >
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

            </van-dialog>

        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";

import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "InfoSet",
  data() {
    return {
      user: Object,
      sexShow: false,
      introductionShow: false,
      oldPasswordShow: false,
      newPasswordShow: false,
      show: false,
      file: "",
      radio: "0",
      newIntro: "",
      oldPassword: "",
      password: "",
      errorMessage: "",
      confirmMessage: "",
      confirmPassword: "",
      timer: null,
      actions: [
        {
          name: "拍照选择"
        },

        {
          name: "选择相册"
        }
      ]
    };
  },
  mounted() {
    this.user = this.$store.state.user;
  },
  watch: {
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
    handleBack() {
      this.$router.go(-1);
    },
    handleName(){
        Toast({
          message: "抱歉，用户名无法修改。",
          duration: 3000
        });
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      if (item.name === "选择相册") {
        document.getElementById("img-upload-input").click();
      }
    },
    changeHeadUrl() {
      this.show = true;
    },
    getFile: function(event) {
      this.file = event.target.files[0];
      this.submit();
    },
    submit: function() {
      //            //阻止元素发生默认的行为
      //            event.preventDefault();
      let formData = new FormData();
      formData.append("file", this.file);
      axios.post("api/save", formData).then(res => {
        res = res.data;
        if (res.error !== undefined) {
          Toast({
            message: "更换失败",
            duration: 3000
          });
        } else {
          this.cheUserHeadUrl(res);
          Toast({
            message: "更换成功",
            duration: 3000
          });
        }
      });
    },
    ...mapMutations(["cheUserHeadUrl", "changeUserSex", "changeIntro"]),
    showSex() {
      this.sexShow = true;
    },
    showIntro() {
      this.introductionShow = true;
    },
    showPassWord() {
      this.oldPasswordShow = true;
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        setTimeout(done, 1000);
      } else {
        done();
      }
    },
    changeSex() {
      if (parseInt(this.radio) === this.user.sex) {
        this.sexShow = false;
      } else {
        axios.post("/api/changeSex").then(res => {
          res = res.data;
          if (res === "ok") {
            var newSex = this.user.sex === 0 ? 1 : 0;
            this.user.sex = newSex;
            this.changeSex(newSex);
            Toast({
              message: "更新性别成功",
              duration: 3000
            });
          } else {
            Toast({
              message: "更新性别失败",
              duration: 3000
            });
          }
        });
      }
    },
    changeIntroduction() {
      axios
        .post("/api/cheIntroduction", {
          newIntro: this.newIntro
        })
        .then(res => {
          res = res.data;
          if (res === "ok") {
            this.user.introduction = this.newIntro;
            this.changeIntro(this.newIntro);
            Toast({
              message: "更新简介成功",
              duration: 3000
            });
          } else {
            Toast({
              message: "更新简介失败",
              duration: 3000
            });
          }
        });
    },
    isOldPass() {
      axios
        .post("/api/isOldPassword", {
          oldPassword: this.oldPassword
        })
        .then(res => {
          res = res.data;
          if (res === "ok") {
            this.newPasswordShow = true;
          } else {
            Toast({
              message: "输入旧密码错误",
              duration: 3000
            });
            this.oldPassword = "";
          }
        });
    },
    changePassword() {
      if (this.password.length < 6 && this.confirmPassword.length < 6) {
        this.password = "";
        this.confirmPassword = "";
        Toast({
          message: "输入的新密码长度不够",
          duration: 3000
        });
      } else {
        axios
          .post("/api/changePassword", {
            newPassword: this.password
          })
          .then(res => {
            res = res.data;
            if (res === "ok") {
              Toast({
                message: "更换新密码成功",
                duration: 3000
              });
            } else {
              Toast({
                message: "更改新密码错误",
                duration: 3000
              });
            }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.userInfo {
  box-sizing: border-box;
  box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
    0 2px 2px rgba(213, 215, 217, 0.8);
  overflow: hidden;
  display: flex;
  height: 1.8rem;
  background-color: #fff;
  .item-name {
    padding: 0.8rem 0.3rem;
  }
  .item {
    position: absolute;
    right: 0.1rem;
    .item-img {
      width: 1.4rem;
      height: 1.4rem;
      padding: 0.2rem;
      border-radius: 50%;
    }
  }
}
.info-set {
  background-color: #efefef;
  height: 100%;
}
.relatedQue {
  margin-top: 0.5rem;
  .intro {
    font-size: 16px;
    padding: 0.4rem;
    color: #999;
  }
}
</style>
