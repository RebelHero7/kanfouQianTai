<template>
    <ul class="content-ul">
        <li class="content-li"
            v-for="(item, index)
                of
            ques"
            :key="index">
            <div >
                <div class="title">
                    {{item.dataJson.questionTitle}}
                </div>

                <div class="text-content">
                    {{item.dataJson.userName}}：{{item.dataJson.commentContent}}
                </div>
            </div>
            <div class="related">
                <span>{{item.dataJson.commentLikeCount}}赞同·</span>
                <span>{{item.dataJson.commentCommCount}}评论</span>
            </div>
        </li>
    </ul>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "Recommend",
  data() {
    return {
      ques: []
    };
  },
  methods: {
    getQue() {
      axios.get("api/getCommend").then(res => {
        res = res.data.vos;
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
  },
  mounted() {
    this.getQue();
  }
};
</script>

<style lang="scss" scoped>
.content-ul {
  .content-li {
    box-sizing: border-box;
    padding: 0 0.3rem;
    background: #fff;
    margin-top: 0.25rem;
    box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
      0 2px 2px rgba(213, 215, 217, 0.8);
    .title {
      font-family: "Microsoft YaHei";
      font-size: 14px;
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
