<template>
    <div>
        <div class="content">
            {{answer.content}}
        </div>
        <ul class="footer">
            <li class="like" @click="handleLikeAnswer" :class="isLike ? 'change' : ''">
                <span class="iconfont">&#xe610;</span>
                <span>赞同 {{answer.likeCount}}</span>
            </li>
            <li class="like" style="width: 16%" :class="isUnLike ? 'change' : '' " @click="handleUnlikeAnswer">
                <span class="iconfont">&#xe60e;</span>
                <span>反对</span>
            </li>
            <li class="collection"  @click="choiceCollection">
                <span class="iconfont" :class="answer.isCollection ? 'isCollection' : ''" style="font-size: .5rem">&#xe60f;</span>
                <div>收藏</div>
            </li>
            <li class="comment" @click="getAllComment">
                <span class="iconfont" style="font-size: .5rem">&#xe60c;</span>
                <div style="text-align: center">{{answer.commentCount}}</div>
            </li>
        </ul>
        <mt-popup
                class="collection-list"
                style="width: 100%"
                v-model="popupVisible"
                position="bottom"
                popup-transition="popup-fade">

            <mt-checklist
                title="选择收藏夹"
                v-model="value"
                :options="options">
            </mt-checklist>

            <mt-button
                    @click="addCollComm"
                    :disabled="disabled"
                    size="large">
                完成
            </mt-button>

        </mt-popup>
    </div>
</template>

<script>
import axios from "axios";
import { Toast } from "mint-ui";
import { mapMutations } from "vuex";

export default {
  name: "AnswerFooter",
  props: {
    answer: {},
    user: {}
  },
  data() {
    return {
      popupVisible: false,
      value: [],
      options: [],
      disabled: true
    };
  },
  computed: {
    isLike() {
      return this.answer.isLike > 0;
    },
    isUnLike() {
      return this.answer.isLike < 0;
    }
  },
  watch: {
    value() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.value) {
        this.disabled = true;
        return;
      }
      this.timer = setTimeout(() => {
        if (this.value.length > 0) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      }, 100);
    }
  },
  methods: {
    handleLikeAnswer() {
      axios.get("/api/answerLike?commentId=" + this.answer.id).then(res => {
        res = res.data;
        this.answer.isLike = res.isLike;
        this.answer.likeCount = res.likeCount;
      });
    },
    handleUnlikeAnswer() {
      axios.get("/api/answerUnlike?commentId=" + this.answer.id).then(res => {
        res = res.data;
        this.answer.isLike = -1;
        this.answer.likeCount = res.likeCount;
      });
    },
    ...mapMutations(["changeIsLike", "likeCountChange"]),
    choiceCollection() {
      if (this.answer.isCollection) {
        //此处是取消收藏
        axios
          .post("/api/noCollection?commentId=" + this.answer.id)
          .then(res => {
            res = res.data;
            if (res === "ok") {
              Toast({
                message: "取消收藏成功",
                duration: 3000
              });
              this.answer.isCollection = false;
            } else {
              Toast({
                message: "取消收藏失败",
                duration: 3000
              });
            }
          });
      } else {
        //这里才是获得收藏夹
        this.popupVisible = !this.popupVisible;
        axios.get("/api/getUserCollections").then(res => {
          res = res.data.collections;

          for (let i in res) {
            this.options.push({
              value: res[i].id,
              label: res[i].collectionName
            });
          }
        });
      }
    },
    addCollComm() {
      axios
        .post("/api/addCollComm", {
          commentId: this.answer.id,
          collIds: this.value.join(",")
        })
        .then(res => {
          res = res.data;
          if (res === "ok") {
            this.answer.isCollection = true;
            Toast({
              message: "添加到收藏夹成功",
              duration: 3000
            });
          } else {
            this.answer.isCollection = false;
            Toast({
              message: "添加收藏夹失败",
              duration: 3000
            });
          }
          this.popupVisible = false;
          this.value = [];
        });
    },
    getAllComment() {
      this.$emit("changeAnOrComm");
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 0.8rem;
  padding: 0 0.3rem;
  line-height: 0.6rem;
  letter-spacing: 0.01rem;
  font-size: 0.4rem;
}
.footer {
  border: 0.01rem solid #ccc;
  position: fixed;
  height: 1rem;
  width: 100%;
  bottom: 0;
  background-color: white;
  .like {
    font-size: 0.32rem;
    width: 18%;
    height: 0.6rem;
    margin: 0.18rem 0 0.15rem 0.3rem;
    padding-left: 0.25rem;
    line-height: 0.6rem;
    border-radius: 0.1rem;
    border: 0.01rem solid #ccc;
  }
  .change {
    background-color: #00bcd4;
    color: #fff;
  }
  .isCollection {
    color: yellow;
  }
  li {
    float: left;
  }
  .collection {
    margin: 0.14rem 0 0.1rem 1rem;
  }
  .comment {
    margin: 0.14rem 0 0.1rem 1rem;
  }
}
.collection-list {
  width: 100%;
}
</style>
