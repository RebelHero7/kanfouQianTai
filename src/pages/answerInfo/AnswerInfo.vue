<template>
    <div>
        <div v-show="lookAnswer">
            <info-header></info-header>
            <answer-question-info ></answer-question-info>
            <answer-user-info :user="user"></answer-user-info>
            <answer-footer :user="user" :answer="answer" v-on:changeAnOrComm="changeAnOrComm"></answer-footer>
        </div>

        <div class="com-content" v-show="!lookAnswer">
            <mt-header title="评论详情">
                <mt-button @click="handleBack" slot="left">X</mt-button>
            </mt-header>
            <div class="answer-count border-topbottom">评论({{answer.commentCount}})</div>
            <ul class="com-list" v-show="commentList.length > 0">
                <li v-for="(item, index)
                            of
                        commentList"
                    :key="index">
                    <div class="com-icon">
                        <img :src="item.userHeadUrl"/>
                    </div>
                    <div class="com-detail">
                        <div class="user-name">
                            {{item.userName}}
                            <span v-show="isAnswerUser(item.userId)">(作者)</span>
                        </div>
                        <div class="comment-content">{{item.commentContent}}</div>
                        <div class="l-time">
                            {{use.formatDate(item.createdDate)}}
                            <span class="iconfont comment-like" :class="item.isLike ? 'change' : ''" @click="likeComment(item)">
                                &#xe668;
                            </span>
                            <span class="like-count" v-show="item.likeCount > 0">{{item.likeCount}}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="tip">~没有更多内容~</div>
            <div class="footer">
                <input placeholder="添加评论咯~" type="text" class="send-comm" v-model="inputComment">
                <div class="send-icon iconfont" @click="handleAddComment">&#xe606;</div>
            </div>
        </div>
    </div>
</template>

<script>
import InfoHeader from "../questionInfo/components/Head.vue";
import AnswerFooter from "./components/AnFooter.vue";
import AnswerUserInfo from "./components/UserInfo.vue";
import AnswerQuestionInfo from "./components/QuestionInfo.vue";
import router from "../../router";
import axios from "axios";
import { Toast } from "mint-ui";

export default {
  name: "AnswerInfo",
  //  props: {
  //    answer: Object,
  //    question: Object
  //  },
  data() {
    return {
      user: {},
      answer: {},
      lookAnswer: true,
      commentList: [],
      inputComment: ""
    };
  },
  components: {
    InfoHeader,
    AnswerQuestionInfo,
    AnswerUserInfo,
    AnswerFooter
  },
  methods: {
    getInfo() {
      //      this.question.title = this.$route.params.title;
      //      this.question = this.$store.state.question;
      //如果这个不为空，表示是从问题详情页进来的
      if (this.$route.params.user !== undefined) {
        this.user = this.$route.params.user;
        this.answer = this.$route.params.comment;
      } else {
        //这个表示从首页进来的。
        this.user = this.$store.state.answerUser;
        this.answer = this.$store.state.answer;
      }
    },
    isAnswerUser(userId) {
      return userId === this.user.id;
    },
    handleBack() {
      this.lookAnswer = true;
    },
    getAllComment() {
      axios
        .get("/api/getCommentByAnswerId?answerId=" + this.answer.id)
        .then(res => {
          res = res.data.vos;
          for (let i in res) {
            this.commentList.push(res[i].objs);
          }
        });
    },
    changeAnOrComm() {
      this.lookAnswer = false;
      this.commentList = [];
      this.getAllComment();
    },
      likeComment(item){
        axios.post("/api/likeComment?commentId=" + item.commentId).then((res) =>{
            res = res.data;
            item.likeCount = res.likeCount;
            item.isLike = res.isLike;
        })
      },
    handleAddComment() {
      if (this.inputComment.length > 0) {
        axios
          .post("/api/addComment", {
            answerId: this.answer.id,
            content: this.inputComment
          })
          .then(res => {
            res = res.data;
            if (res.msg === -3) {
              Toast({
                message: "包含敏感词，请检查后再提交",
                duration: 3000
              });
            } else {
              Toast({
                message: "回答成功",
                duration: 3000,
                iconClass: "icon icon-success"
              });
              this.commentList.push({
                commentId: res.commentId,
                userId: this.$store.state.user.id,
                userName: this.$store.state.user.name,
                userHeadUrl: this.$store.state.user.headUrl,
                commentContent: this.inputComment,
                createdDate: new Date()
              });
              this.answer.commentCount++;
              this.inputComment = "";
            }
          });
      }
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style lang="scss" scoped>
.com-content {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #eee;
  .answer-count {
    padding-left: 0.3rem;
    color: #777;
    font-size: 0.3rem;
    line-height: 0.8rem;
  }
  .header {
    width: 100%;
    height: 1.4rem;
    background: #444444;
    position: fixed;
    top: 0;
    left: 0;
    .back {
      float: left;
      width: 1.4rem;
      height: 1.4rem;
      background-size: 40%;
    }
    .sort {
      float: right;
      width: 1.4rem;
      height: 1.4rem;
      background-size: 50%;
    }
  }
  .com-list {
    width: 100%;
    background: #fff;
    box-shadow: 0 2px 2px rgba(213, 215, 217, 0.8);
    li {
      padding: 0.2rem 0 0 0;
      overflow: hidden;
    }
    .com-icon {
      float: left;
      img {
        width: 0.8rem;
        height: 0.8rem;
        margin-left: 0.3rem;
        border-radius: 50%;
      }
    }
    .com-detail {
      margin-bottom: 0.2rem;
      width: 78%;
      border-bottom: 0.02rem solid #d3d3d3;
      margin-left: 18%;
      .comment-content {
        line-height: 0.6rem;
        font-size: 0.32rem;
      }
      .user-name {
        font-weight: bold;
        font-size: 0.32rem;
        margin-bottom: 0.3rem;
        padding-top: 0.1rem;
      }
      .l-time {
        color: #999999;
        margin: 0.36rem 0;
        position: relative;
        .comment-like {
          font-size: 0.36rem;
          position: absolute;
          right: 0.7rem;
        }
          .change {
              color: #00bcd4;
          }
          .like-count{
              font-size: 0.32rem;
              position: absolute;
              right: 0.2rem;
          }
      }
    }
  }
}
.tip {
  height: 1.4rem;
  width: 100%;
  line-height: 1.4rem;
  text-align: center;
  margin-bottom: 1.4rem;
  color: #989898;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 1rem;
  width: 100%;
  background: #fff;
  box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8);
  .send-comm {
    width: 80%;
    height: 0.7rem;
    background: #fff;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 2px solid rgba(156, 156, 156, 0.8);
    margin-left: 5%;
    font-size: 14px;
  }
  .send-icon {
    width: 1rem;
    height: 1rem;
    float: right;
    margin-right: 0.2rem;
    margin-top: 0.2rem;
    background-size: contain;
  }
}
</style>
