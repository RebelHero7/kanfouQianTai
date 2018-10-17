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
  }
};
</script>

<style lang="scss" scoped>
.userInfo {
  box-sizing: border-box;
  padding: 0 0.3rem;
  margin-top: 0.5rem;
  box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
    0 2px 2px rgba(213, 215, 217, 0.8);
  overflow: hidden;
  display: flex;
  height: 1.8rem;
  .item-img {
    width: 1rem;
    height: 1rem;
    padding: 0.2rem;
    border-radius: 50%;
  }
  .item-info {
    flex: 1;
    min-width: 0;
    padding: 0.2rem;
    .item-name {
      line-height: 0.44rem;
      font-size: 0.32rem;
    }
    .item-desc {
      height: 0.4rem;
      line-height: 0.4rem;
      color: #000;
      text-align: left;
      margin-top: 0.16rem;
    }
  }
}
</style>
