<template>
    <div class="list" ref="wrapper">
        <div class="button-list">
            <div class="button-wrapper"
                 v-for="item
                            of
                         labels"
                 :key="item.id"
                 @click="handleLabel(item.id)">
                <div class="button">
                    {{item.name}}
                </div>
            </div>
        </div>
        <div class="desc">
            <h1 class="desc-title">{{question.title}}</h1>
            <div class="desc-content">{{question.content}}</div>
        </div>
        <div class="follow">
            <span class="follower">{{question.followCount}}人关注</span>
            <span @click="handleFollow">
                <mt-button v-if="!question.isFollow" class="follQue" size="small" type="primary">+ 关注问题</mt-button>
                <mt-button v-else class="follQue" size="small" type="default">取消关注</mt-button>
            </span>
        </div>

        <mt-button size="large"
                   class="answer-css"
                   v-if="noMyAnswer"
                   @click="handleAnswer">
            <span class="iconfont">&#xe62e;</span>
            写回答
        </mt-button>
        <mt-button size="large" class="answer-css" v-else>
            <span class="iconfont">&#xe62e;</span>
            修改回答
        </mt-button>
    </div>
</template>


<script>
import { Toast } from "mint-ui";
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "InfoLabel",
  props: {
    question: Object,
    labels: Array
  },
  data() {
    return {
      noMyAnswer: true,
      value: "time"
    };
  },

  methods: {
    handleLabel(labelId) {
      this.setLabelId(labelId);
      this.$router.push("label");
    },
    ...mapMutations(["setLabelId"]),
    handleAnswer() {
      this.$router.push("/addAnswer");
    },
    handleFollow() {
      if (!this.question.isFollow) {
        axios
          .post("/api/followQuestion?questionId=" + this.question.id)
          .then(res => {
            res = res.data;
            if (res.error !== undefined) {
              Toast({
                message: res.error,
                duration: 5000
              });
            } else {
              this.question.isFollow = true;
              this.question.followCount++;
            }
          });
      } else {
        axios
          .post("/api/unFollowQuestion?questionId=" + this.question.id)
          .then(res => {
            res = res.data;
            if (res.error !== undefined) {
              Toast({
                message: res.error,
                duration: 5000
              });
            } else {
              this.question.isFollow = false;
              this.question.followCount--;
            }
          });
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.list {
  overflow: hidden;
  top: 0.86rem;
  right: 0;
  left: 0;
  bottom: 0;

  .answer-css {
    margin-top: 0.2rem;
    background-color: white;
  }
  .button-list {
    overflow: hidden;
    padding: 0.1rem;
    .button-wrapper {
      width: 33.33%;
      float: left;
      .button {
        margin: 0.1rem;
        border-radius: 0.06rem;
        padding: 0.1rem 0;
        text-align: center;
        border: 0.02rem solid #ccc;
      }
    }
  }
  .desc {
    padding: 0 0.2rem;
    .desc-title {
      line-height: 0.5rem;
      font-size: 0.4rem;
      font-weight: bold;
      margin-bottom: 0.2rem;
    }
    .desc-content {
      letter-spacing: 0.02rem;
      line-height: 0.35rem;
      margin: 0.3rem 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }
  }
  .follow {
    padding: 0 0.2rem;
    height: 0.7rem;
    position: relative;
    .follower {
      position: absolute;
      top: 0.2rem;
    }
    .follQue {
      float: right;
    }
  }
}
</style>
