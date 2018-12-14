<template>

    <div class="notice">
        <mt-header title="消息通知" style="font-size: 18px"></mt-header>
        <div class="mess">
            <mt-cell
                    title="私信列表"
                    to="/privateLetter"
                    is-link
            >
            </mt-cell>
        </div>
        <div class="notice_list">
            通知列表
        </div>
        <notice-list :noticeList="noticeList"></notice-list>
    </div>

</template>

<script>
import NoticeList from "./components/NoticeList.vue";
import axios from "axios";
export default {
  name: "Notice",
  data() {
    return {
      selected: "通知",
      noticeList: []
    };
  },
  components: {
    NoticeList
  },
  methods: {
    getNoticeList() {
      axios.get("/api/pushNotices").then(res => {
        res = res.data.notices;
        for (let i in res) {
          this.noticeList.push(res[i]);
        }
      });
    }
  },
  mounted() {
    this.getNoticeList();
  }
};
</script>

<style lang="scss" scoped>
.notice {
  .mess {
    background-color: #ebebeb;
    padding: 0.24rem 0;
  }
  .notice_list {
    border-bottom: 0.002rem solid #d3d3d3;
    min-height: 1rem;
    line-height: 1rem;
    padding: 0 0 0 0.2rem;
    font-size: 0.32rem;
    color: #999999;
    font-weight: bold;
  }
}
</style>
