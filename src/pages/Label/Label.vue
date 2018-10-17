<template>
    <div style="height: 100%">
        <mt-header :title="label.name">
            <mt-button icon="back" slot="left" @click="handleBack">返回</mt-button>
        </mt-header>
        <label-info :label="label" :questionCount="questionCount"></label-info>
        <label-relevant :label="label"></label-relevant>
    </div>
</template>

<script>
import axios from "axios";
import LabelInfo from "./components/LabelInfo.vue";
import LabelRelevant from "./components/LabelRelevant.vue";
import { mapMutations } from "vuex";

export default {
  name: "Label",
  data() {
    return {
      label: {
        id: this.$store.state.label.id
      },
      questionCount: 0
    };
  },
  components: {
    LabelInfo,
    LabelRelevant
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    getLabelInfo(labelId) {
      axios.get("/api/getLabelInfo?labelId=" + labelId).then(res => {
        res = res.data;
        this.label = res.label;
        this.labelInfo(res);
        this.questionCount = res.questionCount;
      });
    },
    ...mapMutations(["labelInfo"])
  },
  mounted() {
    this.getLabelInfo(this.label.id);
  }
};
</script>

<style lang="scss" scoped>
</style>
