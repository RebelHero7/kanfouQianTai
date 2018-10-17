<template>
    <div class="labelInfo">
        <div class="chat-head">
            <a class="list-head">
                <img src="https://pic4.zhimg.com/80/v2-3428cb933e4aa762401efaeb0238a1af_qhd.jpg"/>
            </a>
        </div>
        <div class="label-detail">
            <span class="label-name">{{label.name}}</span>
            <p class="label-brief">
                {{label.content}}
            </p>
            <p class="label-relevant">
                {{questionCount}}个相关问题
            </p>
        </div>
    </div>
</template>

<script>
export default {
  name: "LabelInfo",
  props: {
    label: Object,
    questionCount: Number
  }
};
</script>

<style lang="scss" scoped>
.labelInfo {
  padding: 0.4rem 0.2rem;
  overflow: hidden;
  margin: 0 0.2rem;
  position: relative;
  .chat-head {
    position: relative;
    float: left;
    .list-head {
      float: left;
      width: 2.4rem;
      height: 2.4rem;
      overflow: hidden;
      border-radius: 0.2rem;
    }
  }
  .label-detail {
    float: left;
    margin: 0.2rem 0.3rem;
    .label-name {
      color: #232323;
      font-weight: bold;
      display: inline-block;
      font-size: 0.4rem;
    }
    .label-brief {
      color: #646464;
      font-size: 0.32rem;
      margin-top: 1em;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-wrap: normal;
    }
    .label-relevant {
      color: #646464;
      font-size: 0.34rem;
      margin-top: 2.5em;
      font-weight: bold;
      width: 100%;
    }
  }
}
</style>
