<template>
    <div class="m-text">
        <input placeholder="请输入您想发送的内容" v-model="text" />
        <mt-button type="primary" size="small" @click="inputing">发送</mt-button>

    </div>
</template>
<script>
import axios from "axios";
import { Toast } from "mint-ui";
export default {
  name: "UserInput",
  props: {
    user: Object
  },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    inputing() {
      if (this.text.length === 0) {
        Toast({
          message: "请输入内容",
          duration: 3000
        });
      } else {
        axios
          .post("/api/addMessage", {
            toName: this.user.name,
            content: this.text
          })
          .then(() => {
            this.$emit("newMessage", {
              fromId: this.$store.state.user.id,
              message: {
                content: this.text
              }
            });
            this.text = "";
          });
      }
    }
  }
};
</script>



<style lang="scss">
.m-text {
  justify-content: flex-end;
  width: 100%;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.05);
  background: #fff;
  z-index: 2;
  input {
    height: 0.66rem;
    width: 82%;
    outline: none;
    margin-right: 0.3rem;
  }
}
</style>
