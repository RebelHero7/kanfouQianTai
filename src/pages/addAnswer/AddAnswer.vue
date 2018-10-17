<template>
    <div class="question">
        <mt-header title="添加回答">
            <mt-button @click="handleClose" slot="left">关闭</mt-button>
            <mt-button :disabled="disabled"
                       slot="right"
                       @click="handSubmission">提交</mt-button>
        </mt-header>
        <textarea placeholder="请写下你的回答..."
                  class="content"
                  v-model="content"
                  autoHeight="true"
        />
    </div>
</template>

<script>
import axios from "axios";
import { Toast } from "mint-ui";
export default {
  name: "AddAnswer",
  data() {
    return {
      content: "",
      disabled: true,
      timer: null
    };
  },
  watch: {
    content() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.content) {
        this.disabled = true;
        return;
      }
      this.timer = setTimeout(() => {
        this.disabled = false;
      }, 200);
    }
  },
  methods: {
    handleClose() {
      this.$router.go(-1);
    },
    handSubmission() {
      axios
        .post("/api/addAnswer", {
          questionId: this.$store.state.questionInfo.id,
          content: this.content
        })
        .then(res => {
          res = res.data.msg;
          if (res === -3) {
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
            this.$store.state.questionInfo.commentCount++;
            this.$router.go(-1);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.question {
  position: relative;
  height: 100%;
  .title {
    border: none #ffffff;
    border-bottom: #777777 solid 1px;
    background: transparent;
    height: 0.86rem;
    line-height: 0.86rem;
    width: 100%;
    font-weight: bold;
    font-size: 21px;
    margin-top: 0.32rem;
  }
  .errorInfo {
    position: relative;
    height: 0.6rem;
    line-height: 0.6rem;
    .error {
      color: red;
      position: absolute;
      right: 0;
    }
  }
  .content {
    width: 100%;
    height: 100%;
    padding: 0.2rem;
  }
}
</style>
