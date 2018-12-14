<template>
    <div>
        <mt-header title="我的关注" style="font-size:18px">
            <mt-button icon="back" slot="left" @click="handleBack">返回</mt-button>
        </mt-header>
        <mt-navbar v-model="selected" class="shadow">
            <mt-tab-item id="1">问题</mt-tab-item>
            <mt-tab-item id="2">用户</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <follow-question></follow-question>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <follow-user></follow-user>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import FollowQuestion from "./components/FollowQuestion.vue";
import FollowUser from "./components/FollowUser.vue";
export default {
  name: "Follow",
  data() {
    return {
      selected: "1"
    };
  },
  components: {
    FollowQuestion,
    FollowUser
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 0 6px 5px rgba(213, 215, 217, 0.8);
}
</style>
