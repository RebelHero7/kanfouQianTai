<template>
    <div class="header">
        <div class="header-input">
            <span class="iconfont search" @click="handleBack">&#xe612;</span>
            <span>请输入您要搜索内容</span>
            <router-link to="/addQuestion">
                <div class="question">
                    <span class="separate">|</span>
                    <span class="iconfont">&#xe62e;</span>
                    <span @click="">提问</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: "InfoHeader",
  methods: {
    handleBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  overflow: hidden;
  line-height: 0.86rem;
  box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
    0 2px 2px rgba(213, 215, 217, 0.8);
  background: #fff;
  font-size: 0.32rem;
  height: 0.86rem;
  .head-back {
    position: absolute;
    text-align: center;
    top: 0;
    left: 0;
    font-size: 0.4rem;
    width: 0.64rem;
    color: #fff;
  }
  .header-input {
    flex: 1;
    height: 0.64rem;
    line-height: 0.64rem;
    margin: 0.12rem 0.2rem;
    padding-left: 0.3rem;
    color: #d0d0d0;
    border-radius: 0.1rem;
    background-color: #ebebeb;
    .search {
      color: #646464;
      padding-right: 0.3rem;
    }
    .question {
      float: right;
      padding-right: 0.3rem;
      color: #646464;
      .separate {
        padding-top: 0.5rem;
        padding-right: 0.3rem;
      }
    }
  }
}
</style>
