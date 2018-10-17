<template>
    <div>
        <div v-show="showList">
            <mt-header title="私信">
                <mt-button icon="back" @click="handleBack" slot="left">返回</mt-button>
            </mt-header>
            <letter-list></letter-list>
            <div class="add_msg" @click="addmsg">
                <span class="add"> + </span>
            </div>
        </div>

        <div v-show="!showList">
            <div class="header">
                <span class="iconfont back"
                      @click="handleClose"
                >&#xe612;</span>
                <input class="header-input"
                       placeholder="请输入您想私信的人"
                       v-model="inputUser"
                       ref="inputUser"/>
            </div>
            <!--注意，以下的css样式可以可以和前面的letter-list类似！！可以写到一处来！！先暂时不这样！！！-->
            <ul class="user-list"
                infinite-scroll-disabled="loading"
                v-infinite-scroll="loadMore"
                infinite-scroll-distance="10"
            >
                <li v-for="(item, index) in allUser"
                    :key="index"
                    class="search-item"
                    @click="handleChat(item)">
                    <div class="chat-head">
                        <a class="list-head">
                            <img :src="item.headUrl"/>
                        </a>
                    </div>
                    <div class="user-detail">
                        <span class="user-name">{{item.name}}</span>
                        <p class="user-brief">
                            {{item.introduction}}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import LetterList from "./LetterList.vue";

export default {
  name: "PrivateLetter",
  data() {
    return {
      inputUser: "",
      showList: true,
      chatList: [],
      allUser: []
    };
  },
  components: {
    LetterList
  },
  watch: {
    inputUser() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.inputUser) {
        this.allUser = [];
        return;
      }
      this.timer = setTimeout(() => {
        this.searchmsgUser();
      }, 200);
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    handleClose() {
      this.allUser = null;
      this.inputUser = "";
      this.showList = true;
    },
    addmsg() {
      this.showList = false;
    },
    searchmsgUser() {
      axios
        .get(
          "/api/selLikeUser?name=" +
            this.inputUser +
            "&start=" +
            this.allUser.length
        )
        .then(res => {
          res = res.data;
          for (let i in res.users) {
            this.allUser.push(res.users[i]);
          }
        });
    },
    handleChat(user) {
      this.$router.push({
        name: "chatDetail",
        params: {
          user: user
        }
      });
    },
    loadMore() {
      if (this.allUser.length !== 0) {
        this.searchmsgUser();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.add_msg {
  position: absolute;
  float: right;
  top: 13rem;
  right: 0.5rem;
  background-color: #26a2ff;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 1.2rem;
  .add {
    color: #fff;
    float: right;
    font-size: 0.8rem;
    margin: 0.2rem 0.35rem 0 0;
  }
}

.header {
  position: relative;
  overflow: hidden;
  line-height: 0.86rem;
  box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
    0 2px 2px rgba(213, 215, 217, 0.8);
  background: #fff;
  font-size: 0.32rem;
  height: 0.86rem;
  .header-input {
    flex: 1;
    width: 85%;
    height: 0.64rem;
    line-height: 0.64rem;
    margin: 0.12rem 0.2rem;
    padding-left: 0.3rem;
    border-radius: 0.1rem;
    background-color: #ebebeb;
  }
  .back {
    color: #646464;
    margin-left: 0.2rem;
  }
}

.user-list {
  li {
    border-bottom: 0.02rem solid #e0e0e0;
    padding: 0.4rem 0.2rem 0.2rem 0.2rem;
    overflow: hidden;
    margin: 0 0.2rem;
    position: relative;
    .user-info {
      float: right;
      text-align: right;
      color: #999;
      font-size: 0.24rem;
      .l-time {
        position: absolute;
        right: 0.2rem;
        top: 0.4rem;
        white-space: nowrap;
        font-size: 0.24rem;
      }
    }
    .chat-head {
      position: relative;
      float: left;
      .list-head {
        float: left;
        width: 1rem;
        height: 1rem;
        overflow: hidden;
        border: 1px solid #ededed;
        border-radius: 1rem;
      }
    }
    .user-detail {
      float: left;
      .user-name {
        position: absolute;
        left: 1.6rem;
        top: 0.4rem;
        color: #232323;
        display: inline-block;
        font-size: 0.35rem;
      }
      .user-brief {
        position: absolute;
        left: 1.6rem;
        top: 1rem;
        color: #666;
        float: left;
        font-size: 0.32rem;
        width: 6rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-wrap: normal;
      }
    }
  }
}
</style>
