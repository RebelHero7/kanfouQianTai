<template>
    <div style="height: 100%">
        <mt-header title="新建收藏夹">
            <mt-button @click="handleClose" slot="left">关闭</mt-button>

            <mt-button :disabled="disabled"
                       slot="right"
                       @click="handleAddCollection">提交</mt-button>
        </mt-header>
        <div class="collection">

            <input placeholder="请输入收藏夹标题"
                   class="name"
                   v-model="name"
                   ref="tit"
            />
            <textarea placeholder="请输入收藏夹描述（选填）"
                      class="content"
                      v-model="content"
            />
        </div>
    </div>

</template>

<script>
import axios from "axios";
import { Toast } from "mint-ui";

export default {
  name: "AddCollection",
  data() {
    return {
      name: "",
      content: "",
      disabled: true,
      timer: null
    };
  },
  watch: {
    name() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.name) {
        this.disabled = true;
        return;
      }
      this.timer = setTimeout(() => {
        if (this.name.length < 1) {
          this.disabled = true;
        } else {
          this.disabled = false;
          this.$refs.tit.style.borderColor = "#00bcd4";
        }
      }, 200);
    }
  },
  methods: {
    handleAddCollection() {
      axios
        .post("/api/addCollection", {
          name: this.name,
          content: this.content
        })
        .then(res => {
          res = res.data;
          if (res.msg === "ok") {
            Toast({
              message: "添加收藏夹成功",
              duration: 3000
            });
            this.$router.push("myCollection");
          } else {
            Toast({
              message: "添加收藏夹失败",
              duration: 3000
            });
            this.$router.push("myCollection");
          }
        });
    },
    handleClose() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.collection {
  height: 100%;
  padding: 0 0.3rem;
  .name {
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
  .content {
    width: 100%;
    height: 100%;
    padding-top: 0.2rem;
  }
}
</style>
