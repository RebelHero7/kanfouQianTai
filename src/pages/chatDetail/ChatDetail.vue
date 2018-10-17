<template>
    <div style="height: 100%">
        <mt-header :title="user.name">
            <mt-button icon="back" slot="left" @click="handleBack">返回</mt-button>
        </mt-header>
        <message :msgUser="user" :message="message"></message>
        <user-input :user="user" v-on:newMessage="newMessage"></user-input>
    </div>
</template>

<script>
import axios from "axios";
import Message from "./components/Message.vue";
import UserInput from "./components/UserInput.vue";
export default {
  name: "ChatDetail",
  data() {
    return {
      user: {},
      message: []
    };
  },
  components: {
    UserInput,
    Message
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    newMessage(val) {
      this.message.push(val);
    },
    handleMsgDetail() {
      let localUserId = this.$store.state.user.id;
      let otherUserId = this.$route.params.user.id;
      if (localUserId > otherUserId) {
        axios
          .get(
            "/api/msg/detail?conversationId=" + otherUserId + "_" + localUserId
          )
          .then(res => {
            this.handleDetailResult(res);
          });
      } else {
        axios
          .get(
            "/api/msg/detail?conversationId=" + localUserId + "_" + otherUserId
          )
          .then(res => {
            this.handleDetailResult(res);
          });
      }
    },
    handleDetailResult(res) {
      res = res.data.vos;
      for (let i in res) {
        this.message.push(res[i].objs);
      }
    }
  },
  mounted() {
    //这个是对话的用户
    this.user = this.$route.params.user;
    this.handleMsgDetail();
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  overflow: hidden;
  background-color: #eee;
}
</style>
