<template>
    <div class="userInfo">
        <img :src="user.headUrl" class="item-img"/>
        <div class="item-info">
            <p class="item-name">{{user.name}}</p>
            <p class="item-desc">{{user.introduction}}</p>
            <span class="follow" @click="handleFollow" v-show="isMyAnswer">
                    <mt-button v-show="!user.isFollow" size="small" type="primary">+ 关注</mt-button>
                    <mt-button v-show="user.isFollow" size="small" type="default">取消关注</mt-button>
            </span>
        </div>
    </div>

</template>

<script>
import { Toast } from "mint-ui";
import axios from "axios";
export default {
  name: "AnswerUserInfo",
  props: {
    user: Object
  },

  //    watch: {
  //        answerUser(Val){
  //            if(curVal){
  //                this.user = curVal;
  //            }
  //        },
  //    },
  mounted() {},
  computed: {
    isMyAnswer() {
      return this.user.id !== this.$store.state.user.id;
    }
  },
  methods: {
    handleFollow() {
      if (!this.user.isFollow) {
        axios.post("/api/followUser?userId=" + this.user.id).then(res => {
          res = res.data;
          if (res.error !== undefined) {
            Toast({
              message: res.error,
              duration: 5000
            });
          } else {
            this.user.isFollow = true;
            Toast({
              message: "关注成功",
              duration: 5000
            });
          }
        });
      } else {
        axios.post("/api/unFollowUser?userId=" + this.user.id).then(res => {
          res = res.data;
          if (res.error !== undefined) {
            Toast({
              message: res.error,
              duration: 5000
            });
          } else {
            Toast({
              message: "取消关注成功",
              duration: 5000
            });
            this.user.isFollow = false;
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
  padding: 0.1rem 0 0.2rem;
  margin-top: 0.3rem;
  box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
    0 2px 2px rgba(213, 215, 217, 0.8);
  overflow: hidden;
  display: flex;
  height: 1.8rem;
  .item-img {
    width: 1rem;
    height: 1rem;
    padding: 0.2rem;
    border-radius: 50%;
  }
  .item-info {
    flex: 1;
    min-width: 0;
    padding: 0.2rem;
    position: relative;
    .item-name {
      line-height: 0.44rem;
      font-size: 0.32rem;
    }
    .item-desc {
      height: 0.4rem;
      line-height: 0.4rem;
      color: #000;
      text-align: left;
      margin-top: 0.16rem;
    }
    .follow {
      position: absolute;
      right: 0.2rem;
      top: 0.4rem;
    }
  }
}
</style>
