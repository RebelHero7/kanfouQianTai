<template>
    <div>
        <div class="relatedQue">
            <mt-cell
                    title="最近浏览"
                    to="/recentLook"
                    is-link
            >
            </mt-cell>
        </div>
        <div class="relatedQue">
            <mt-cell
                    title="我的关注"
                    to="/follow"
                    is-link
            >
            </mt-cell>
            <mt-cell
                    title="我的创作"
                    to="/myAllAnswer"
                    is-link
            >
            </mt-cell>

        </div>


        <div class="relatedQue">
            <mt-cell
                    title="我的收藏"
                    to="/myCollection"
                    is-link
            >
            </mt-cell>
        </div>
        <div class="relatedQue">
            <mt-cell
                    title="个人信息设置"
                    value=">"
            >
            </mt-cell>
        </div>
        <div class="logout">
            <mt-button type="danger" size="large" @click="handleLayout">退出登录</mt-button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RelatedQue",
  props: {
    user: Object
  },

  methods: {
    handleLayout() {
      axios.get("/api/layout").then(() => {
        this.$router.push("/loginAndReg");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.relatedQue {
  margin-top: 0.5rem;
}
.logout {
  background-color: white;
  height: 3rem;
  line-height: 1.5rem;
  padding-top: 1.5rem;
}
</style>
