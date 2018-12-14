<template>
    <div >
        <home-head></home-head>
        <van-tabs color="#00bcd4" @scroll="scroll" @click="getLabelRecommend">
            <van-tab v-for="(item, index) in labels" :key="index" :title="item.name" >

            </van-tab>

        </van-tabs>
        <div class="no-result" v-show="ques.length === 0">
            <span style="font-weight: bold">不好意思没有最新的推荐</span>
            <br />
            <p class="tips">原谅我懒的加数据~！</p>
        </div>
        <ul class="content-ul" v-show="ques.length > 0">
            <li class="content-li"
                v-for="(item, index)
                            of
                        ques"
                :key="index"
                @click="handleAnswerDetail(item)">
                <div >
                    <div class="title">
                        {{item.questionTitle}}
                    </div>

                    <div class="text-content">
                        {{item.userName}}：{{item.commentContent}}
                    </div>
                </div>
                <div class="related">
                    <span>{{item.likeCount}}赞同·</span>
                    <span>{{item.commentCount}}评论</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import HomeHead from "../home/components/Header.vue";

import { mapMutations } from "vuex";
import axios from "axios";
export default {
  components: { HomeHead },
  name: "Recommend",
  data() {
    return {
      ques: [],
      labels: [
        {
          id: 0,
          name: "全部"
        }
      ]
    };
  },
  methods: {
    scroll() {
      console.log("滚动了，出发了");
    },
    getQue() {
      axios.get("api/getDefaultCommend").then(res => {
        res = res.data.vos;
        for (let i in res) {
          this.ques.push(res[i].objs);
        }
      });
    },
    getLabelRecommend(index) {
      const labelId = this.labels[index].id;
      if (labelId === 0) {
        this.getQue();
      } else {
        this.ques = [];
        axios.get("/api/getByLabelId?labelId=" + labelId).then(res => {
          res = res.data.vos;
          for (let i in res) {
            this.ques.push(res[i].objs);
          }
        });
      }
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
    getLabels() {
      axios.get("/api/getAllLabel").then(res => {
        res = res.data.labels;
        for (let i in res) {
          this.labels.push(res[i]);
        }
      });
    },
    ...mapMutations([
      "answerInfo",
      "questionInfo",
      "answerUserInfo",
      "questionId"
    ])
  },
  mounted() {
    this.getLabels();
    this.getQue();
  }
};
</script>

<style lang="scss" scoped>
.content-ul {
  .content-li {
    box-sizing: border-box;
    padding: 0.3rem;
    background: #fff;
    margin-top: 0.25rem;
    box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
      0 2px 2px rgba(213, 215, 217, 0.8);
    .title {
      font-family: "Microsoft YaHei";
      font-size: 18px;
      line-height: 0.6rem;
      font-weight: bold;
    }
    .text-content {
      color: #474747;
      padding: 0.2rem 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 16px;
    }
    .related {
      color: #99a4aa;
    }
  }
}
</style>
