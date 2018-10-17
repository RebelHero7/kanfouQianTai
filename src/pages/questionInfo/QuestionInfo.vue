<template>
    <div>
        <info-header></info-header>
        <info-label :question="question" :labels="labels"></info-label>
        <answer-list :answerCount="question.commentCount"></answer-list>
    </div>
</template>

<script>
import axios from "axios";
import InfoHeader from "./components/Head.vue";
import InfoLabel from "./components/LabAndDesc";
import AnswerList from "./components/AnswerList.vue";
import { mapMutations } from "vuex";

export default {
  name: "QuestionInfo",
  components: {
    InfoHeader,
    InfoLabel,
    AnswerList
  },
  data() {
    return {
      question: {},
      labels: []
    };
  },
  methods: {
    getQuestionInfo(questionId) {
      axios.get("/api/getQuestionById?questionId=" + questionId).then(res => {
        res = res.data.vo.objs;
        this.questionInfo(res);
        this.labels = res.labels;
      });
      this.question = this.$store.state.questionInfo;
    },
    ...mapMutations(["questionInfo"])
  },
  mounted() {
    this.getQuestionInfo(this.$store.state.questionInfo.id);
  }
};
</script>

<style lang="scss" scoped>
</style>
