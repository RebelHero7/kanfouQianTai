<template>
    <div class="parent">

        <!--:selected="selected"-->
        <!--下滑出现，上滑消失-->
        <div class="footer">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <home-head></home-head>
                    <home-content></home-content>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <notice></notice>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <home-head></home-head>
                    <my-info></my-info>
                </mt-tab-container-item>
            </mt-tab-container>

            <mt-tabbar v-model="selected" v-show="showAbs" fixed>
                <mt-tab-item id="1">
                    <div class="iconfont separate">&#xe61f;</div>
                    首页
                </mt-tab-item>
                <mt-tab-item id="2">
                    <div class="iconfont separate">&#xe61e;</div>
                    通知
                </mt-tab-item>
                <mt-tab-item id="3">
                    <div class="iconfont separate">&#xe62a;</div>
                    我的
                </mt-tab-item>
            </mt-tabbar>
        </div>
    </div>
</template>

<script>
import HomeHead from "./components/Header.vue";
import HomeContent from "./components/HomeContent.vue";
import MyInfo from "../myInfo/MyInfo.vue";
import Notice from "../notice/Notice.vue";
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
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const scroll = scrollTop - this.i;
      this.i = scrollTop;
      if (scroll < 0) {
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

<style scoped>
.parent {
  position: relative;
}
</style>
