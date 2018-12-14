<template>
    <div class="header">
        <div class="header-input">
            <span class="iconfont search">&#xe604;</span>
            <input @click="handleSearch" placeholder="请输入您要搜索内容" />
            <router-link to="/addQuestion">
                <div class="question">
                    <span class="separate">|</span>
                        <span class="iconfont" style="font-size: 18px;">&#xe62e;</span>
                        <span>提问</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    handleSearch() {
      this.$router.push("/searchQuestion");
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  overflow: hidden;
  text-align: center;
  background: #26a2ff;
  font-size: 0.36rem;
  .header-input {
    flex: 1;
    line-height: 0.64rem;
    margin: 0.12rem 0.2rem;
    padding-left: 0.3rem;
    color: #ccc;
    background: #fff;
    border-radius: 0.1rem;
    .search {
      font-size: 18px;
      padding-right: 0.3rem;
    }
    .question {
      float: right;
      padding-right: 0.3rem;
      color: #ccc;
      .separate {
        padding-top: 0.5rem;
        padding-right: 0.3rem;
      }
    }
  }
}
</style>
