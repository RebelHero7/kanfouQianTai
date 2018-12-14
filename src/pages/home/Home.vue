<template>
    <div class="parent">
        <!--下滑出现，上滑消失-->
        <div>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="home">
                    <home-head></home-head>
                    <home-content></home-content>
                </mt-tab-container-item>
                <mt-tab-container-item id="recommend">
                    <recommend></recommend>
                </mt-tab-container-item>
                <mt-tab-container-item id="notice">
                    <notice></notice>
                </mt-tab-container-item>
                <mt-tab-container-item id="userInfo">
                    <home-head></home-head>
                    <my-info></my-info>
                </mt-tab-container-item>
            </mt-tab-container>

            <mt-tabbar v-model="selected" v-show="showAbs" fixed>
                <mt-tab-item id="home">
                    <div class="iconfont separate large">&#xe61f;</div>
                    首页
                </mt-tab-item>
                <mt-tab-item id="recommend">
                    <div class="iconfont separate large">&#xe647;</div>
                    推荐
                </mt-tab-item>
                <mt-tab-item id="notice">
                    <div class="iconfont separate large">&#xe61e;</div>
                    通知
                </mt-tab-item>
                <mt-tab-item id="userInfo">
                    <div class="iconfont separate large">&#xe62a;</div>
                    我的
                </mt-tab-item>
            </mt-tabbar>
        </div>
    </div>
</template>

<script>
import HomeHead from "./components/Header.vue";
import HomeContent from "./components/Content.vue";
import MyInfo from "../myInfo/MyInfo.vue";
import Notice from "../notice/Notice.vue";
import Recommend from "../recommend/Recommend.vue";
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      selected: this.$store.state.homeSelected,
      showAbs: true,
      i: 0
    };
  },
  components: {
    Recommend,
    HomeHead,
    HomeContent,
    MyInfo,
    Notice
  },
  methods: {
    handleUserInfo(res) {
      this.userInfo(res);
    },
    handleChangeHomeSelected(selected) {
      this.changeHomeSelected(selected);
    },
    ...mapMutations(["userInfo", "changeHomeSelected"]),
    handleScroll() {
      // 页面滚动距顶部距离
      const sTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const scroll = sTop - this.i;
      this.i = sTop;
      if (scroll <= 0) {
        this.showAbs = true;
      } else {
        this.showAbs = false;
      }
    }
  },
  created() {
    axios.get("/api/").then(res => {
      res = res.data;
      if (res.hasEnter === 1) {
        this.handleUserInfo(res);
      } else {
        this.$router.push("/loginAndReg");
      }
    });
    window.addEventListener("scroll", this.handleScroll, true);
  },
  watch: {
    selected(val) {
      this.handleChangeHomeSelected(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.parent {
  position: relative;
  .large {
    font-size: 26px;
  }
}
</style>
