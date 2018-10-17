<template>
    <div style="height: 100%;">
        <mt-header title="提问">
            <mt-button @click="handleClose" slot="left">关闭</mt-button>

            <mt-button :disabled="disabled"
                       slot="right"
                       @click="handleNext">提交</mt-button>
        </mt-header>
        <div class="question">


            <input placeholder="请输入标题"
                   class="title"
                   v-model="title"
                   ref="tit"
            />
            <div class="errorInfo">
                <div class="error">{{error}}</div>
            </div>
            <textarea placeholder="请输入问题描述（选填）"
                   class="content"
                   v-model="content"
            />
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "AddQuestion",
  data() {
    return {
      error: "",
      title: this.$store.state.quTitle,
      content: this.$store.state.quContent,
      disabled: true,
      timer: null
    };
  },
  watch: {
    title() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.title) {
        this.disabled = true;
        return;
      }
      this.timer = setTimeout(() => {
        if (this.title.length < 2) {
          this.error = "问题字数太少了吧";
          this.disabled = true;
          this.$refs.tit.style.borderColor = "red";
        } else {
          this.error = "";
          this.disabled = false;
          this.$refs.tit.style.borderColor = "#00bcd4";
        }
      }, 200);
    }
  },
  methods: {
    handleNext() {
      if (!this.disabled) {
        this.newQuestion({ title: this.title, content: this.content });
        this.$router.push({ path: "/choiceLabel" });
      }
    },
    ...mapMutations(["newQuestion"]),
    handleClose() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.question {
  height: 100%;
  padding: 0 0.3rem;
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
  }
}
</style>
