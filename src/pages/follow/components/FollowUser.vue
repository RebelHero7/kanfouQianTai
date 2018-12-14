<template>

    <div class="list">
        <ul class="letter-list">
            <li v-for="(item, index) in followUsers"
                :key="index"
                class="userInfo">
                <img :src="item.userHeadUrl" class="item-img"/>
                <div class="item-info">
                    <p class="item-name">{{item.userName}}</p>
                    <p class="item-desc">{{item.introduction}}</p>
                    <span class="follow" @click="handleFollow(item)" >
                        <mt-button v-show="!item.isFollow" size="small" type="primary">+ 关注</mt-button>
                        <mt-button v-show="item.isFollow" size="small" type="default">已关注</mt-button>
                    </span>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import axios from "axios";
export default {
  name: "FollowUser",
  data() {
    return {
      followUsers: []
    };
  },
  methods: {
    getFollowQuestion() {
      axios.get("/api/getFollowUser").then(res => {
        res = res.data.vos;
        for (let i in res) {
          this.followUsers.push(res[i].objs);
        }
      });
    },
    handleFollow(ret) {
      if (!ret.isFollow) {
        axios.post("/api/followUser?userId=" + ret.id).then(res => {
          res = res.data;
          if (res.error !== undefined) {
            Toast({
              message: res.error,
              duration: 3000
            });
          } else {
            ret.isFollow = true;
            Toast({
              message: "关注成功",
              duration: 3000
            });
          }
        });
      } else {
        MessageBox.confirm("确定取消关注" + ret.userName + "?").then(() => {
          axios.post("/api/unFollowUser?userId=" + ret.id).then(res => {
            res = res.data;
            if (res.error !== undefined) {
              Toast({
                message: res.error,
                duration: 3000
              });
            } else {
              Toast({
                message: "取消关注成功",
                duration: 3000
              });
              ret.isFollow = false;
            }
          });
        });
      }
    }
  },
  mounted() {
    this.getFollowQuestion();
  }
};
</script>

<style lang="scss" scoped>
.userInfo {
  box-sizing: border-box;
  border-bottom: 0.02rem solid #d3d3d3;
  padding: 0.1rem 0 0.2rem;
  margin-top: 0.3rem;

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
      font-size: 0.34rem;
      font-weight: bold;
    }
    .item-desc {
      height: 0.4rem;
      line-height: 0.4rem;
      color: #999;
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
