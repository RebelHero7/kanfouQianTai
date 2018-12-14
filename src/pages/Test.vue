<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <form>
            <input type="file" @change="getFile($event)">
            <button class="button button-primary button-pill button-small" @click="submit($event)">提交</button>
        </form>

        <img :src="headUrl" class="item-img"/>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Test",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      file: "",
      headUrl:
        "http://kanfou.oss-cn-beijing.aliyuncs.com/imgFile/1541298824659.jpg"
    };
  },
  methods: {
    getFile: function(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
    submit: function(event) {
      //阻止元素发生默认的行为
      event.preventDefault();
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post("api/save", formData)
        .then(function(response) {
          alert(response.data);
          console.log(response);
          window.location.reload();
        })
        .catch(function(error) {
          alert("上传失败");
          console.log(error);
          window.location.reload();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.item-img {
  width: 1rem;
  height: 1rem;
  padding: 0.2rem;
  border-radius: 50%;
}
</style>
