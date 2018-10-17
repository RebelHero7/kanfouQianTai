<template>
    <div>
        <div class="answer-info">
            <div class="answer-count border-topbottom">{{answerCount}}个回答</div>
            <select class="answer-sort" @change="changeList" v-model="selected">
                <option value="time">按时间排序</option>
                <option value="quality">按质量排序</option>
            </select>
        </div>
        <ul class="content-ul"
            infinite-scroll-disabled="loading"
            v-infinite-scroll="loadMore"
            infinite-scroll-distance="10"
        >
            <li class="content-li"
                v-for="(item, index)
                    of
                ques"
                :key="index"
                @click="handleDetail(index)">
                <div class="header">
                    <img :src="item.user.headUrl" alt=""/>
                    <span class="name">{{item.user.name}}</span>

                </div>
                <div class="text-content">
                    {{item.comment.content}}
                </div>
                <div class="related">
                    <span>{{item.likeCount}}赞同 · </span>
                    <!--这里是评论的评论数{{item.objs.comment.commentCount}}-->
                    <span>{{item.commentCount}}评论 · </span>
                    <span class="with-name">{{use.formatDate(item.comment.createdDate)}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "AnswerList",
  props: {
    answerCount: Number
  },
  data() {
    return {
      selected: "time",
      ques: []
    };
  },
  methods: {
    getQueByTime(start) {
      axios
        .get(
          "api/getAllAnswerByTime?start=" +
            start +
            "&questionId=" +
            this.$store.state.questionInfo.id
        )
        .then(res => {
          res = res.data;
          for (let i in res.allAnswer) {
            this.ques.push(res.allAnswer[i].objs);
          }
        });
    },
    getQueByQuality(start) {
      axios
        .get(
          "api/getAllAnswerByQuality?start=" +
            start +
            "&questionId=" +
            this.$store.state.questionInfo.id
        )
        .then(res => {
          res = res.data;
          for (let i in res.allAnswer) {
            this.ques.push(res.allAnswer[i].objs);
          }
        });
    },
    changeList() {
      this.ques = [];
      if (this.selected === "time") {
        this.getQueByTime(this.ques.length);
      } else {
        this.getQueByQuality(this.ques.length);
      }
    },
    loadMore() {
      if (this.selected === "time") {
        this.getQueByTime(this.ques.length);
      } else {
        this.getQueByQuality(this.ques.length);
      }
    },
    //这里为什么不用路由，因为这个是从问题详情页进去的，如果使用路由就会覆盖之前的，如从首页进来的答案。
    handleDetail(index) {
      axios
        .get(
          "/api/getAnswerFromQuestion?commentId=" + this.ques[index].comment.id
        )
        .then(ret => {
          ret = ret.data;
          this.$set(this.ques[index].comment, "isFollow", ret.isFollow);
          this.$set(this.ques[index].comment, "isLike", ret.isLike);
          this.$set(this.ques[index].comment, "likeCount", ret.likeCount);
          this.$set(this.ques[index].comment, "isCollection", ret.isCollection);
          this.$set(this.ques[index].comment, "commentCount", ret.commentCount);
          this.$router.push({
            name: "answerInfo",
            params: {
              user: this.ques[index].user,
              comment: this.ques[index].comment
            }
          });
        });
    },
    ...mapMutations(["answerInfo", "questionInfo", "answerUserInfo"])
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
    margin-bottom: 0.25rem;
    box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
      0 2px 2px rgba(213, 215, 217, 0.8);
    .header {
      height: 0.5rem;
      padding: 0.22rem 0 0 0;
      img {
        height: 100%;
        float: left;
        border-radius: 60%;
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
      font-size: 14px;
      font-weight: bold;
    }
    .text-content {
      line-height: 0.4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #474747;
      padding: 0.2rem 0;
    }
    .related {
      color: #99a4aa;
      padding-bottom: 0.2rem;
    }
  }
}
</style>
