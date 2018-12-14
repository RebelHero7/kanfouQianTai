<template>
    <div>
        <mt-header :title="collection.collectionName">
            <mt-button icon="back" slot="left" @click="handleBack">返回</mt-button>
        </mt-header>
        <div class="answer-count border-topbottom">{{collection.collectionCount}}个内容</div>
        <ul class="content-ul">
            <li v-for="(item, index) in answers"
                :key="index"
                class="content-li"
                @click="getAnswerDetail(item.objs)">
                <span class="follow" @click.stop="handleCollection(item.objs)">
                    <mt-button v-show="!item.objs.isCollection" size="small" type="primary">+ 收藏</mt-button>
                    <mt-button v-show="item.objs.isCollection" size="small" type="default">已收藏</mt-button>
                </span>
                <div class="header">
                    <img :src="item.objs.userHeadUrl" alt=""/>
                    <span class="name">{{item.objs.userName}}</span>
                </div>
                <div>
                    <div class="title">
                        {{item.objs.questionTitle}}
                    </div>
                    <div class="text-content">
                        {{item.objs.commentContent}}
                    </div>
                </div>
                <div class="related">
                    <span>{{item.objs.likeCount}}赞同·</span>
                    <span>{{item.objs.commentCount}}评论</span>
                </div>
            </li>

        </ul>

    </div>

</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "CollectionInfo",
  data() {
    return {
      collection: {},
      answers: []
    };
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    getAllCollection() {
      axios.get("/api/getAllCollection?id=" + this.collection.id).then(res => {
        res = res.data.vos;
        for (let i in res) {
          this.answers.push(res[i]);
        }
      });
    },
    getAnswerDetail(res) {
      //这里的res是事件中的记录。进入之后应改变点赞数和是否点赞过。
      axios.get("/api/getAnswer?commentId=" + res.commentId).then(ret => {
        ret = ret.data;

        this.answerInfo(ret);
        this.questionInfo(ret);
        this.answerUserInfo(ret);
      });
      this.$router.push("/answerInfo");
    },
    ...mapMutations(["questionInfo", "answerUserInfo", "answerInfo"]),
    handleCollection(ret) {
      if (!ret.isCollection) {
        axios
          .post("/api/addCollComm", {
            commentId: ret.commentId,
            collIds: this.collection.id
          })
          .then(res => {
            res = res.data;
            if (res === "ok") {
              Toast({
                message: "添加到收藏夹成功",
                duration: 3000
              });
            } else {
              Toast({
                message: "添加收藏夹失败",
                duration: 3000
              });
            }
            ret.isCollection = true;
          });
      } else {
        MessageBox.confirm("确定取消收藏?").then(() => {
          axios
            .post(
              "/api/unCollComm?answerId=" +
                ret.commentId +
                "&collectionId=" +
                this.collection.id
            )
            .then(res => {
              res = res.data;
              if (res !== "ok") {
                Toast({
                  message: res.error,
                  duration: 3000
                });
              } else {
                Toast({
                  message: "取消关注成功",
                  duration: 3000
                });
                ret.isCollection = false;
              }
            });
        });
      }
    }
  },
  mounted() {
    this.collection = this.$store.state.collection;
    this.getAllCollection(this.collection.id);
  }
};
</script>

<style lang="scss" scoped>
.answer-count {
  padding-left: 0.3rem;
  background: #eee;
  color: #777;
  font-size: 0.3rem;
  line-height: 0.8rem;
}

.content-ul {
  .content-li {
    position: relative;
    box-sizing: border-box;
    padding: 0 0.3rem;
    background: #fff;
    margin-bottom: 0.25rem;
    box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
      0 2px 2px rgba(213, 215, 217, 0.8);
    .header {
      height: 0.7rem;
      padding: 0.22rem 0 0 0;
      img {
        height: 60%;
        float: left;
        border-radius: 60%;
        padding-top: 0.1rem;
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
    .follow {
      position: absolute;
      right: 0.2rem;
      top: 0.4rem;
    }
    .title {
      font-size: 0.32rem;
      font-weight: bold;
    }
    .text-content {
      color: #474747;
      font-size: 0.3rem;
      padding: 0.2rem 0;
      overflow: hidden;
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
