<template>
    <div class="label-relevant">
        <mt-navbar v-model="selected" class="shadow">
            <mt-tab-item id="1">简介</mt-tab-item>
            <mt-tab-item id="2">相关问题</mt-tab-item>
        </mt-navbar>


        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1" >
                <div class="brief-introduction">
                    <div class="title">简介</div>
                    <div class="content">
                        {{label.content}}
                    </div>
                </div>

            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <relevant-question :labelId="label.id"></relevant-question>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import RelevantQuestion from "./chComponent/RelevantQuestion";
export default {
  name: "LabelRelevant",
  data() {
    return {
      selected: "1"
    };
  },
  props: {
    label: Object
  },
  components: {
    RelevantQuestion
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.label-relevant {
  background-color: #ebebeb;
  height: 100%;
  .shadow {
    box-shadow: 0 6px 5px rgba(213, 215, 217, 0.8);
  }
  .brief-introduction {
    margin-top: 0.3rem;
    background-color: #fff;
    padding: 0.3rem;
    .title {
      font-weight: bold;
      padding: 0.5rem 0;
      font-size: 0.36rem;
    }
    .content {
      line-height: 0.5rem;
      font-size: 0.32rem;
      color: #646464;
    }
  }
}
</style>
