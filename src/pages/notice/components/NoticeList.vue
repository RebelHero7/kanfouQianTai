<template>
    <div class="list">
        <ul class="letter-list">

            <li v-for="(item, index) in noticeList"
                :key="index"
                class="search-item"
                @click="isAnswer(item.type) ? handleAnswer(item.dataJson) : handleQuestion(item.dataJson.questionId)"
            >
                <div class="chat-head">
                    <a class="list-head">
                        <img :src="item.dataJson.userHead"/>
                    </a>
                </div>
                <div class="letter-detail">
                    <span class="letter-name" v-if="item.type === 8">{{item.dataJson.userName}}  评论了你的回答</span>
                    <span class="letter-name" v-if="item.type === 4">{{item.dataJson.userName}}  关注了你提出的问题</span>
                    <span class="letter-name" v-else-if="item.type === 1">{{item.dataJson.userName}}  回答了问题</span>
                    <p class="letter-brief">
                        {{item.dataJson.questionTitle}}
                    </p>
                </div>
                <div class="letter-info">
                    <span class="l-time">{{use.formatDate(item.createdDate)}}</span>
                </div>
            </li>
        </ul>
    </div>

</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "NoticeList",
  props: {
    noticeList: Array
  },
  methods: {
    handleAnswer(res) {
      //这里的res是事件中的记录。进入之后应改变点赞数和是否点赞过。
      axios.get("/api/getAnswer?commentId=" + res.commentId).then(ret => {
        ret = ret.data;

        this.answerInfo(ret);
        this.questionInfo(ret);
        this.answerUserInfo(ret);
      });
      this.$router.push("/answerInfo");
    },
    isAnswer(type) {
      return type === 1 || type === 8;
    },
    handleQuestion(questionId) {
      this.questionId(questionId);
      this.$router.push("/questionInfo");
    },
    ...mapMutations([
      "answerInfo",
      "questionInfo",
      "answerUserInfo",
      "questionId"
    ])
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
        float: left;
        text-align: right;
        color: #999;
        font-size: 0.24rem;
        .l-time {
          position: absolute;
          left: 1.6rem;
          top: 1.4rem;
          white-space: nowrap;
          font-size: 0.28rem;
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
          display: inline-block;
          font-size: 0.32rem;
          color: #666;
        }
        .letter-brief {
          color: #232323;
          font-size: 0.35rem;
          position: absolute;
          left: 1.6rem;
          top: 0.9rem;
          float: left;
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
