<template>
    <div class="list">
        <ul class="letter-list">
            <li v-for="(item, index) in chatList"
                :key="index"
                class="search-item"
                @click="handleChat(item.user)">
                <div class="letter-info">
                    <span class="l-time">{{use.formatDate(item.message.createdDate)}}</span>
                </div>
                <div class="chat-head">
                    <span v-show="item.unRead > 0" class="msg-num"></span>
                    <a class="list-head">
                        <img :src="item.user.headUrl"/>
                    </a>
                </div>
                <div class="letter-detail">
                    <span class="letter-name">{{item.user.name}}</span>
                    <p class="letter-brief">
                        {{item.message.content}}
                    </p>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LetterList",
  data() {
    return {
      chatList: []
    };
  },
  methods: {
    getmsgList() {
      axios.get("/api/msg/list").then(res => {
        res = res.data.vos;
        for (let i in res) {
          this.chatList.push(res[i].objs);
        }
      });
    },
    handleChat(user) {
      //改变阅读后的值。
      //        axios.put("/api/changeHasRead");
      this.$router.push({
        name: "chatDetail",
        params: {
          user: user
        }
      });
    }
  },
  mounted() {
    this.getmsgList();
  }
};
</script>

<style lang="scss" scoped>
.list {
  .letter-list {
    li {
      border-bottom: 0.02rem solid #e0e0e0;
      padding: 0.4rem 0.2rem;
      overflow: hidden;
      margin: 0 0.2rem;
      position: relative;
      .letter-info {
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
        .msg-num {
          position: absolute;
          top: 0;
          right: 0;
          background: #e84a4a;
          color: #fff;
          width: 3px;
          border-radius: 12px;
          line-height: 12px;
          min-height: 12px;
          padding: 0 4px;
          z-index: 10;
        }
        .list-head {
          float: left;
          width: 1rem;
          height: 1rem;
          overflow: hidden;
          border: 1px solid #ededed;
          border-radius: 1rem;
        }
      }
      .letter-detail {
        float: left;
        .letter-name {
          position: absolute;
          left: 1.6rem;
          top: 0.4rem;
          color: #232323;
          display: inline-block;
          font-size: 0.35rem;
        }
        .letter-brief {
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
}
</style>
