<template>
    <div>
        <ul>
            <li v-for="(item, index) in followQuestions"
                :key="index"
                class="list"
                @click="handleQuestion(item)">
                <div class="title">
                    <span>
                        {{item.title}}
                    </span>
                </div>
                <div class="count-follow">
                    <span>{{item.commentCount}}个回答·</span>
                    <span>{{item.followerCount}}人关注</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "FollowQuestion",
  data() {
    return {
      followQuestions: []
    };
  },
  methods: {
    getFollowQuestion() {
      axios.get("/api/getFollowQuestion").then(res => {
        res = res.data.vos;
        for (let i in res) {
          this.followQuestions.push(res[i].objs);
        }
      });
    },
    handleQuestion(res) {
      this.questionId(res.id);
      this.$router.push("/questionInfo");
    },
    ...mapMutations(["questionId"])
  },
  mounted() {
    this.getFollowQuestion();
  }
};
</script>

<style lang="scss" scoped>
.list {
  border-bottom: 0.02rem solid #d3d3d3;
  padding: 0 0.5rem;
  .title {
    padding: 0.4rem 0 0 0;
    font-size: 0.36rem;
    line-height: 0.5rem;
  }
  .count-follow {
    padding: 0.2rem 0 0.3rem 0;
    font-size: 0.34rem;
    color: #999;
  }
}
</style>
