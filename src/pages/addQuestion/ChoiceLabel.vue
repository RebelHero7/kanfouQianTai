<template>
    <div>
        <mt-header title="添加话题" style="font-size:18px">
            <mt-button icon="back" slot="left" @click="handleBack">返回</mt-button>

            <mt-button :disabled="hasDataDis"
                       slot="right"
                       @click="handlerAddQ">提交</mt-button>
        </mt-header>
        <div class="label">
            <div class="question">
                <input placeholder="搜索并添加相关话题"
                       class="inputLab"
                       v-model="inputLab"
                       ref="inputLab"
                />
                <ul class="user-list">
                    <li v-for="(item, index) in allLab"
                        :key="index"
                        class="search-item"
                        @click="handleAddLabel(index)">
                        <div class="chat-head">
                            <a class="list-head">
                                <img src="https://pic4.zhimg.com/80/v2-3428cb933e4aa762401efaeb0238a1af_qhd.jpg"/>
                            </a>
                        </div>
                        <span class="user-name">{{item.name}}</span>
                    </li>
                </ul>
                <div class="msg" v-show="hasNodata">{{msg}}</div>
            </div>

            <div class="readlyLabel">
                <ul v-show="hasData" class="user-list">
                    <li class="border-bottom">已添加的话题</li>
                    <!--<li class="search-item border-bottom"-->
                        <!--v-for="item-->
                            <!--of-->
                        <!--lists"-->
                        <!--:key="item.id"-->
                    <!--&gt;-->
                        <!--{{item.name}}</li>-->
                    <li v-for="(item, index) in lists"
                        :key="index"
                        class="search-item"
                    >
                        <div class="chat-head">
                            <a class="list-head">
                                <img src="https://pic4.zhimg.com/80/v2-3428cb933e4aa762401efaeb0238a1af_qhd.jpg"/>
                            </a>
                        </div>
                        <span class="user-name">{{item.name}}</span>.
                        <span class="deleteLabel" @click.stop="deleteLab(index)">X</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

import { Toast } from "mint-ui";
import axios from "axios";
export default {
  name: "Question",
  data() {
    return {
      msg: "请至少添加一个话题",
      inputLab: "",
      content: "",
      disabled: true,
      timer: null,
      allLab: [],
      lists: []
    };
  },
  computed: {
    hasNodata() {
      return !this.allLab.length && !this.lists.length;
    },
    hasDataDis() {
      return !this.lists.length;
    },
    hasData() {
      return this.lists.length;
    }
  },
  watch: {
    inputLab() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.inputLab) {
        this.allLab = [];
        return;
      }
      this.timer = setTimeout(() => {
        axios.get("/api/selLikeLabel?name=" + this.inputLab).then(res => {
          res = res.data;
          this.allLab = res.labels;
        });
      }, 200);
    }
  },
  methods: {
    handlerAddQ() {
      var labelIds = "";
      var arr1 = [];
      if (this.lists.length) {
        for (let i in this.lists) {
          arr1.push(this.lists[i].id);
        }
        labelIds = arr1.join(",");
        axios
          .post("/api/addQuestion", {
            title: this.$store.state.quTitle,
            content: this.$store.state.quContent,
            labelIds: labelIds
          })
          .then(res => {
            res = res.data;
            if (res.ok !== undefined) {
              Toast({
                message: res.ok,
                iconClass: "icon icon-success"
              });
              this.newQuestion({
                title: "",
                content: ""
              }),
                this.$router.push("/");
            } else {
              Toast({
                message: res.msg,
                position: "bottom",
                duration: 5000
              });
            }
          });
      }
    },
    handleAddLabel(index) {
      this.lists.push(this.allLab[index]);
      this.allLab = [];
      this.inputLab = "";
    },
    deleteLab(index) {
      this.lists.splice(index);
    },
    handleBack() {
      this.$router.go(-1);
    },
    ...mapMutations(["newQuestion"])
  }
};
</script>

<style lang="scss" scoped>
.label {
  padding: 0 0.3rem;
  .question {
    .user-list {
      li {
        border-bottom: 0.02rem solid #e0e0e0;
        padding: 0.2rem;
        overflow: hidden;
        position: relative;
        .user-info {
          float: right;
          text-align: right;
          color: #999;
          font-size: 0.24rem;
          .l-time {
            position: absolute;
            right: 0.2rem;
            top: 0.4rem;
            white-space: nowrap;
            font-size: 0.24rem;
          }
        }
        .chat-head {
          position: relative;
          float: left;
          .list-head {
            float: left;
            width: 0.6rem;
            height: 0.6rem;
            overflow: hidden;
            border: 1px solid #ededed;
          }
        }
        .user-name {
          padding-left: 0.2rem;
          line-height: 0.6rem;
          color: #232323;
          display: inline-block;
          font-size: 0.35rem;
        }
      }
    }
    position: relative;
    .inputLab {
      border: none #ffffff;
      border-bottom: #777777 solid 1px;
      background: transparent;
      height: 0.86rem;
      line-height: 0.86rem;
      width: 100%;
      font-weight: bold;
      font-size: 21px;
      margin-top: 0.32rem;
    }

    .msg {
      color: #777777;
      position: absolute;
      right: 0;
      top: 1.5rem;
    }
    .title {
      margin-top: 0.2rem;
      line-height: 0.8rem;
      color: #777777;
      .item {
        overflow: hidden;
        display: flex;
        height: 2.4rem;
        .item-img {
          width: 0.8rem;
          height: 0.8rem;
        }
      }
    }

    .search-item {
      z-index: 10;
      border: none #ffffff;
      border-bottom: #777777 solid 1px;
      background: transparent;
      line-height: 0.62rem;
      padding-left: 0.2rem;
      color: #666;
    }
  }
  .readlyLabel {
    margin-top: 0.4rem;
    .user-list {
      li {
        border-bottom: 0.02rem solid #e0e0e0;
        padding: 0.2rem;
        overflow: hidden;
        position: relative;
        .user-info {
          float: right;
          text-align: right;
          color: #999;
          font-size: 0.24rem;
          .l-time {
            position: absolute;
            right: 0.2rem;
            top: 0.4rem;
            white-space: nowrap;
            font-size: 0.24rem;
          }
        }
        .chat-head {
          position: relative;
          float: left;
          .list-head {
            float: left;
            width: 0.6rem;
            height: 0.6rem;
            overflow: hidden;
            border: 1px solid #ededed;
          }
        }
        .user-name {
          padding-left: 0.2rem;
          line-height: 0.6rem;
          color: #232323;
          display: inline-block;
          font-size: 0.35rem;
        }
        .deleteLabel {
          top: 0.4rem;
          position: absolute;
          right: 0.2rem;
        }
      }
    }
  }
}
</style>
