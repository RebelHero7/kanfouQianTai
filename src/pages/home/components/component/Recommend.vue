<template>
    <div style="margin-top: .2rem">
        <van-tabs>
            <van-tab v-for="(item, index) in labels" :key="index" :title="item.name">

            </van-tab>
            <ul class="content-ul">
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
        </van-tabs>

    </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";
export default {

  name: "Recommend",
  data() {
    return {
      ques: [],
        labels:[]
    };
  },
  methods: {
    getQue() {
      axios.get("api/getDefaultCommend").then(res => {
        res = res.data.vos;
        for (let i in res) {
          this.ques.push(res[i].objs);
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
      getLabels(){
        axios.get("/api/getAllLabel").then((res) => {
            res = res.data.labels;
            for(let i in res){
                this.labels.push(res[i]);
            }
        })
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
    }
  }
}
</style>
