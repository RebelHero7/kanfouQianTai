<template>
    <div class="userInfo">
        <img :src="user.headUrl" class="item-img"/>
        <div class="item-info">
            <p class="item-name">{{user.name}}</p>
            <p class="item-desc">{{user.introduction}}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    user: Object
  },
  data() {
    return {
      show: false,
      file: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.userInfo {
  box-sizing: border-box;
  margin-top: 0.5rem;
  box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
    0 2px 2px rgba(213, 215, 217, 0.8);
  overflow: hidden;
  display: flex;
  height: 1.8rem;
  background-color: #fff;
  .item-img {
    width: 1.4rem;
    height: 1.4rem;
    padding: 0.2rem;
    border-radius: 50%;
  }
  .item-info {
    flex: 1;
    min-width: 0;
    padding: 0.4rem 0.1rem;
    position: relative;
    .item-name {
      line-height: 0.44rem;
      font-size: 18px;
    }
    .item-desc {
      height: 0.4rem;
      line-height: 0.4rem;
      color: #999;
      text-align: left;
      margin-top: 0.16rem;
      font-size: 16px;
    }
  }
}
</style>
