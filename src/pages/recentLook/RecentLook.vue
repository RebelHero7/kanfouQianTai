<template>

        <div >
            <mt-header title="最近浏览" style="font-size:18px">
                <mt-button icon="back" slot="left" @click="handleBack">返回</mt-button>
            </mt-header>
            <div class="no-result" v-show="recentLook.length === 0">
                <span style="font-weight: bold">不好意思您尚未浏览任何回答</span>
                <br />
            </div>
            <ul v-show="recentLook.length !== 0">
                <li v-for="(item, index) in recentLook"
                    :key="index"
                    class="list"
                    @click="handleAnswer(item)">
                    <div class="title">
                        <span >{{item.questionTitle}}{{item.userName}} 的回答</span>
                    </div>
                    <div class="answer-content">
                        <span >{{item.commentContent}}</span>
                    </div>
                </li>
            </ul>
        </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "RecentLook",
  data() {
    return {
      recentLook: []
    };
  },
  methods: {
    handleRecentLook() {
      axios.get("/api/getReLook").then(res => {
        res = res.data.vos;
        for (let i in res) {
          let k = res[i].objs;
          for (let j in this.recentLook) {
            if (this.recentLook[j].commentId === k.commentId) {
              this.recentLook.splice(j, 1);
            }
          }
          this.recentLook.push(k);
        }
      });
      //      console.log(this.recentLook.length);
    },
    handleBack() {
      this.$router.go(-1);
    },
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
    ...mapMutations(["questionInfo", "answerUserInfo", "answerInfo"])
  },
  mounted() {
    this.handleRecentLook();
  }
};
</script>

<style lang="scss" scoped>
.no-result {
  margin-top: 5rem;
  text-align: center;
  font-size: 0.36rem;
}
.list {
  border-bottom: 0.02rem solid #949494;
  padding: 0 0.5rem;
  .title {
    padding: 0.4rem 0 0 0;
    font-size: 0.36rem;
  }
  .answer-content {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0.2rem 0 0.3rem 0;
    font-size: 0.34rem;
    color: #6b6b6b;
  }
}
</style>
