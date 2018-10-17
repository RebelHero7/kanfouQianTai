<template>
    <div>
        <ul class="content-ul">
            <li v-for="(item, index) in questions"
                :key="index"
                class="content-li"
                @click="goQuestionInfo(item.questionId)">
                <div>
                    <div class="title">
                        {{item.questionTitle}}
                    </div>
                    <div class="text-content">
                        问题描述：{{item.questionContent}}
                    </div>
                </div>
                <div class="related">
                    <span>{{item.commentCount}}回答·</span>
                    <span>{{item.followCount}}关注</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "RelevantQuestion",
  props: {
    labelId: Number
  },
  data() {
    return {
      questions: []
    };
  },
  methods: {
    getLabelQuestion(labelId) {
      axios.get("/api/getLabelQuestion?labelId=" + labelId).then(res => {
        res = res.data.vos;
        for (let i in res) {
          this.questions.push(res[i].objs);
        }
      });
    },
    goQuestionInfo(questionId) {
      this.questionId(questionId);
      this.$router.push("/questionInfo");
    },
    ...mapMutations(["questionId"])
  },
  mounted() {
    this.getLabelQuestion(this.labelId);
  }
};
</script>

<style lang="scss" scoped>
.content-ul {
  .content-li {
    box-sizing: border-box;
    padding: 0.5rem 0.3rem 0.2rem;
    background: #fff;
    margin-top: 0.25rem;
    box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
      0 2px 2px rgba(213, 215, 217, 0.8);
    .title {
      font-family: "Microsoft YaHei";
      font-size: 0.32rem;
      font-weight: bold;
    }
    .text-content {
      color: #474747;
      padding: 0.24rem 0 0;
      line-height: 0.5rem;
      overflow: hidden;
      /*white-space: nowrap;*/
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .related {
      color: #99a4aa;
      padding: 0.2rem 0;
    }
  }
}
</style>
