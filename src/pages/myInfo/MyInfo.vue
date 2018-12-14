<template>

    <div class="myinfo">
        <!--<mt-header fixed title="个人信息"></mt-header>-->
        <user-info :user="user"></user-info>
        <related-que :user="user"></related-que>
        <!--<my-footer :selected="selected"></my-footer>-->
    </div>

</template>

<script>
import UserInfo from "./components/UserInfo.vue";
import RelatedQue from "./components/RelatedQue.vue";

export default {
  name: "MyInfo",
  data() {
    return {
      selected: "我的",
      user: {}
    };
  },
  components: {
    //        MyFooter,
    UserInfo,
    RelatedQue
  },
  mounted() {
    this.user = this.$store.state.user;
  }
};
</script>

<style lang="scss" scoped>
.myinfo {
  background-color: #efefef;
}
</style>
