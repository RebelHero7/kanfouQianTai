<template>
    <div>
        <mt-navbar v-model="selected" class="shadow">
            <mt-tab-item id="1">关注</mt-tab-item>
            <mt-tab-item id="2">推荐</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <follow-content></follow-content>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <recommend></recommend>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import FollowContent from "./component/Content.vue";
import Recommend from "./component/Recommend.vue";
export default {
  name: "HomeContent",
  data() {
    return {
      selected: "1"
    };
  },
  components: {
    FollowContent,
    Recommend
  }
};
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 0 6px 5px rgba(213, 215, 217, 0.8);
}
</style>
