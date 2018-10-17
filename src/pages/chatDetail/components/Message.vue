<template>
    <div class="m-message">
        <ul>
            <li v-for="(item, index)
                    of
                message"
                :key="index"
            >
                <div v-show="!isMyself(item.fromId)">
                    <p class="time" v-show="item.message.createdDate != undefined">
                        <span>{{use.formatDate(item.message.createdDate)}}</span>
                    </p>
                    <div class="main">
                        <img class="avatar" width="30" height="30" :src="msgUser.headUrl"/>
                        <div class="text">
                            <!--噫吁嚱，危乎高哉！蜀道之难，难于上青天！蚕丛及鱼凫，开国何茫然！-->
                            <!--尔来四万八千岁，不与秦塞通人烟。西当太白有鸟道，可以横绝峨眉巅。-->
                            <!--地崩山摧壮士死，然后天梯石栈相钩连。上有六龙回日之高标，下有冲波逆折之回川。-->
                            <!--黄鹤之飞尚不得过，猿猱欲度愁攀援。青泥何盘盘，百步九折萦岩峦。扪参历井仰胁息，以手抚膺坐长叹。-->
                            <!--问君西游何时还？畏途巉岩不可攀。但见悲鸟号古木，雄飞雌从绕林间。-->
                            <!--又闻子规啼夜月，愁空山。蜀道之难，难于上青天，使人听此凋朱颜！连峰去天不盈尺，枯松倒挂倚绝壁。-->
                            <!--飞湍瀑流争喧豗，砯崖转石万壑雷。其险也如此，嗟尔远道之人胡为乎来哉！-->
                            <!--剑阁峥嵘而崔嵬，一夫当关，万夫莫开。所守或匪亲，化为狼与豺。-->
                            <!--朝避猛虎，夕避长蛇；磨牙吮血，杀人如麻。锦城虽云乐，不如早还家。蜀道之难，难于上青天，侧身西望长咨嗟！-->
                            {{item.message.content}}
                        </div>
                    </div>
                </div>
                <div v-show="isMyself(item.fromId)">
                    <p v-show="item.message.createdDate != undefined" class="time">
                        <span>{{use.formatDate(item.message.createdDate)}}</span>
                    </p>
                    <div class="main self">
                        <img class="avatar" width="30" height="30" :src="localUser.headUrl"/>
                        <div class="text">{{item.message.content}}</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    message: Array,
    msgUser: Object
  },
  data() {
    return {
      localUser: ""
    };
  },
  methods: {
    isMyself(otherId) {
      return otherId === this.localUser.id;
    }
  },
  mounted() {
    this.localUser = this.$store.getters.getUserInfo;
  }
};
</script>

<style lang="scss" scoped>
.m-message {
  height: 87%;
  padding: 0.2rem 0.3rem;
  overflow-y: scroll;

  li {
    margin-bottom: 15px;
  }
  .time {
    margin: 7px 0;
    text-align: center;

    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #fff;
      border-radius: 2px;
      background-color: #dcdcdc;
    }
  }
  .avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 3px;
  }
  .text {
    display: inline-block;
    position: relative;
    padding: 0 0.2rem;
    min-height: 0.6rem;
    line-height: 0.6rem;
    max-width: calc(100% - 60px);
    font-size: 16px;
    text-align: left;
    word-break: break-all;
    background-color: #fafafa;
    border-radius: 4px;

    &:before {
      content: " ";
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fafafa;
    }
  }

  .self {
    text-align: right;

    .avatar {
      float: right;
      margin: 0 0 0 10px;
    }
    .text {
      background-color: #b2e281;

      &:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #b2e281;
      }
    }
  }
}
</style>
