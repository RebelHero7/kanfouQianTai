<template>
    <div>
        <div class="title">{{question.title}}</div>
        <div class="answer">
            <van-button round type="default" >
                <span class="iconfont write">&#xe631;</span>
                写回答
            </van-button>

            <span class="allAnswer" @click="goQuestionInfo(question.id)">
                查看全部{{question.commentCount}}个回答 >
            </span>
        </div>
    </div>
</template>

<script>
export default {
  name: "AnswerQuestionInfo",
  data() {
    return {
      question: this.$store.state.questionInfo
    };
  },
  methods: {
    goQuestionInfo(questionId) {
      this.$router.push({
        name: "questionInfo",
        params: {
          questionId: questionId
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 0.4rem;
  font-weight: bold;
  border-bottom: 0.01rem solid #ccc;
  padding: 0.2rem 0.3rem;
  line-height: 0.6rem;
}

.answer {
  border-bottom: 0.01rem solid #ccc;
  padding: 0.2rem 0.3rem;
  height: 0.86rem;
  line-height: 0.86rem;
  .write {
    font-size: 16px;
  }
  .allAnswer {
    float: right;
    font-size: 0.32rem;
    color: #9c9c9c;
  }
}
</style>
