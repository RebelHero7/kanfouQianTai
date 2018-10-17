<template>
    <div>
        <div class="no-result" v-show="ques.length === 0">
            <span style="font-weight: bold">您还没有关注的人或是关注的人没有新动态</span>
            <br />
            <p class="tips">可以先看看推荐页啦~</p>
        </div>
        <ul class="content-ul"
            infinite-scroll-disabled="loading"
            v-infinite-scroll="loadMore"
            infinite-scroll-distance="10"
            v-show="ques.length > 0"
            >
            <li class="content-li"
                v-for="(item, index)
                    of
                ques"
                :key="index"
                >
                <div class="header">
                    <img :src="item.dataJson.userHead" alt=""/>
                    <!--赞同2，回答1，收藏3，关注4
                    前三个都是赞同数和评论，后面是回答数和关注数-->
                    <span class="name">{{item.dataJson.userName}}</span>
                    <span class="with-name" v-show="item.type === 0">
                        赞同了回答 ·
                    </span>
                    <span class="with-name" v-show="item.type === 1">
                        回答了问题 ·
                    </span>
                    <span class="with-name" v-show="item.type === 3">
                        收藏了回答 ·
                    </span>
                    <span class="with-name" v-show="item.type === 4">
                        关注了问题 ·
                    </span>
                    <span class="with-name"> {{use.formatDate(item.createdDate)}}</span>
                </div>
                <!--如果是关注问题，那么应该type是4，因此应该查看这个问题的详情。-->
                <div @click="item.type !== 4 ? handleAnswerDetail(item.dataJson) : handleQuestionDetail(item.dataJson.questionId)">
                    <div class="title">
                        {{item.dataJson.questionTitle}}
                    </div>
                    <div class="text-content" v-if=" item.type === 4">
                        问题描述：{{item.dataJson.questionContent}}
                    </div>
                    <div class="text-content" v-else>
                        {{item.dataJson.answerUserName}}：{{item.dataJson.commentContent}}
                    </div>
                </div>
                <div class="related" v-if=" item.type === 4">
                    <span>{{item.dataJson.questionCommentCount}}回答·</span>
                    <span>{{item.dataJson.questionFollowCount}}关注</span>
                </div>
                <div class="related" v-else>
                    <span>{{item.dataJson.commentLikeCount}}赞同·</span>
                    <span>{{item.dataJson.commentCommCount}}评论</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "FollowContent",
  data() {
    return {
      ques: []
    };
  },
  computed: {
    qOrA(type) {
      //关注了问题
      return type !== 4;
    }
  },
  methods: {
    getQue() {
      axios.get("api/pushFeeds?start=" + this.ques.length).then(res => {
        res = res.data.feeds;
        for (let i in res) {
          this.ques.push(res[i]);
        }
      });
    },
    loadMore() {
      this.getQue();
    },
    handleAnswerDetail(item) {
      //这里的res是事件中的记录。进入之后应改变点赞数和是否点赞过。
      axios.get("/api/getAnswer?commentId=" + item.commentId).then(ret => {
        ret = ret.data;

        this.answerInfo(ret);
        this.questionInfo(ret);
        this.answerUserInfo(ret);
      });
      this.$router.push("/answerInfo");
    },

    handleQuestionDetail(questionId) {
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
.no-result {
  margin-top: 5rem;
  text-align: center;
  font-size: 0.36rem;
  .tips {
    color: #999;
    margin: 0.3rem 0;
  }
}
.content-ul {
  .content-li {
    box-sizing: border-box;
    padding: 0 0.3rem;
    background: #fff;
    margin-top: 0.25rem;
    box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
      0 2px 2px rgba(213, 215, 217, 0.8);
    .header {
      height: 0.7rem;
      padding: 0.22rem 0 0 0;
      img {
        height: 60%;
        float: left;
        border-radius: 60%;
        padding-top: 0.1rem;
      }
      span {
        float: left;
        height: 100%;
        line-height: 0.7rem;
      }
      .name {
        color: #99a4aa;
        margin-left: 0.2rem;
      }
      .with-name {
        color: #99a4aa;
      }
    }
    .title {
      font-family: "Microsoft YaHei";
      font-size: 18px;
      font-weight: bold;
    }
    .text-content {
      color: #474747;
      padding: 0.2rem 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .related {
      color: #99a4aa;
      padding-bottom: 0.2rem;
    }
  }
}
</style>
