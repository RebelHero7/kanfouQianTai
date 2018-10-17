<template>
    <div>
        <mt-header title="我的创作">
            <mt-button icon="back" slot="left" @click="handleBack">返回</mt-button>
        </mt-header>
        <div class="answer-info">
            <div class="answer-count border-topbottom">{{ques.length}}个回答</div>
            <div class="answer-sort">按时间排序</div>
        </div>
        <ul class="content-ul"
        >
            <li class="content-li"
                v-for="(item, index)
                    of
                ques"
                :key="index"
                @click="handleAnswerDetail(item.objs)"
            >
                <div>
                    <div class="title">
                        {{item.objs.questionTitle}}
                    </div>
                    <div class="text-content">
                        {{item.objs.commentContent}}
                    </div>
                </div>
                <div class="related">
                    <span>{{use.formatDate(item.objs.answerCreatedDate)}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "MyAllAnswer",
  data() {
    return {
      ques: []
    };
  },
  methods: {
    getAllMyAnswer() {
      axios.get("/api/getMyAllAnswer").then(res => {
        res = res.data;
        for (let i in res.allAnswer) {
          this.ques.push(res.allAnswer[i]);
        }
      });
    },
    handleBack() {
      this.$router.go(-1);
    },
    handleAnswerDetail(res) {
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
    this.getAllMyAnswer();
  }
};
</script>

<style lang="scss" scoped>
.answer-info {
  position: relative;
  .answer-count {
    padding-left: 0.3rem;
    background: #eee;
    color: #777;
    font-size: 0.3rem;
    line-height: 0.8rem;
  }
  .answer-sort {
    position: absolute;
    right: 0.3rem;
    top: 0.25rem;
    color: #777;
    font-size: 0.3rem;
  }
}
.content-ul {
  .content-li {
    box-sizing: border-box;
    padding: 0 0.3rem;
    background: #fff;
    box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
      0 2px 2px rgba(213, 215, 217, 0.8);

    .title {
      font-family: "Microsoft YaHei";
      font-size: 0.35rem;
      padding-top: 0.3rem;
      font-weight: bold;
    }
    .text-content {
      color: #474747;
      padding: 0.2rem 0;
      overflow: hidden;
      font-size: 0.3rem;
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
