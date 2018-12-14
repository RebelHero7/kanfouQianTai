<template>
    <div>
        <div class="search-header">
                <span class="iconfont search-back"
                      @click="handleClose"
                >&#xe612;</span>
            <input class="search-input"
                   placeholder="搜索你想知道的内容吧~"
                   v-model="inputSearch"
                   @keyup.enter="handleSearch"/>
            <span v-show="inputSearch.length > 0" class="search-cancel" @click="handleCancel">x</span>
        </div>
        <ul v-show="this.searchResult.length > 0">
          <li v-for="(item, index)
                of
                searchResult"
              :key="index"
              class="search-li"
                @click="getQuestionDetail(item.question.id)">
              <div class="result-title" v-html="item.question.title">
                  {{item.question.title}}
              </div>
              <div class="result-content" v-html="item.question.content">
                  问题描述：{{item.question.content}}
              </div>
              <div class="result-related">
                  <span>{{item.commentCount}}回答·</span>
                  <span>{{item.followCount}}关注</span>
              </div>
          </li>
        </ul>
        <div class="no-result" v-show="noResult">
            <span style="font-weight: bold">“ {{noResultData}} ”</span>
            <br />
            <p class="tips">未找到相关内容，提问快速获得回答</p>
            <mt-button type="primary" @click="handleAddQuestion">立即提问</mt-button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "searchQuestion",
  data() {
    return {
      inputSearch: "",
      searchResult: [],
      noResult: false,
      noResultData: ""
    };
  },
  methods: {
    handleClose() {
      this.$router.go(-1);
    },
    handleCancel() {
      this.inputSearch = "";
    },
    getQuestionDetail(questionId) {
      this.questionId(questionId);
      this.$router.push("/questionInfo");
    },
    ...mapMutations(["questionId"]),
    handleSearch() {
      this.searchResult = [];
      this.noResult = false;
      axios.get("/api/search?q=" + this.inputSearch).then(res => {
        res = res.data.vos;
        for (let i in res) {
          this.searchResult.push(res[i].objs);
        }
        if (this.searchResult.length === 0) {
          this.noResult = true;
          this.noResultData = this.inputSearch;
        }
      });
    },
    handleAddQuestion() {
      this.$router.push("/addQuestion");
    }
  }
};
</script>

<style lang="scss">
.search-header {
  position: relative;
  overflow: hidden;
  line-height: 0.86rem;
  box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
    0 2px 2px rgba(213, 215, 217, 0.8);
  background: #fff;
  font-size: 0.32rem;
  height: 0.86rem;
  .search-input {
    flex: 1;
    width: 85%;
    height: 0.64rem;
    line-height: 0.64rem;
    padding-left: 0.3rem;
    border-radius: 0.1rem;
    background-color: #ebebeb;
  }
  .search-back {
    font-size: 16px;
    color: #646464;
    margin-left: 0.2rem;
  }
  .search-cancel {
    position: absolute;
    top: 0.12rem;
    right: 0.6rem;
    line-height: 0.64rem;
  }
}

.search-li {
  box-sizing: border-box;
  padding: 0.3rem 0.3rem 0;
  background: #fff;
  margin-top: 0.25rem;
  box-shadow: 0 -2px 2px rgba(213, 215, 217, 0.8),
    0 2px 2px rgba(213, 215, 217, 0.8);
  em {
    color: #ff9607;
  }
  .result-title {
    font-size: 18px;
    font-weight: bold;
  }
  .result-content {
    color: #474747;
    padding: 0.2rem 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .result-related {
    color: #99a4aa;
    padding-bottom: 0.2rem;
  }
}
.no-result {
  margin-top: 5rem;
  text-align: center;
  font-size: 0.36rem;
  .tips {
    color: #999;
    margin: 0.3rem 0;
  }
}
</style>
