<template>
    <div class="my-collection">

        <mt-header title="我的收藏">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <ul>
            <li v-for="(item, index) in collections"
                :key="index"
                class="list"
                @click="getCollectionInfo(item)"
                >
                <div >
                    <span class="name">{{item.collectionName}}</span>
                    <div class="count">
                        {{item.collectionCount}}个内容
                    </div>
                </div>
            </li>
        </ul>
        <div class="add_collection" @click="addCollection">
            <span class="add"> + </span>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "MyCollection",
  data() {
    return {
      collections: []
    };
  },
  methods: {
    addCollection() {
      this.$router.push("/addCollection");
    },
    getMyCollection() {
      axios.get("/api/getUserCollections").then(res => {
        res = res.data.collections;
        for (let i in res) {
          this.collections.push(res[i]);
        }
      });
    },
    getCollectionInfo(collection) {
      this.collectionInfo(collection);
      this.$router.push("/collectionInfo");
    },
    ...mapMutations(["collectionInfo"])
  },
  mounted() {
    this.getMyCollection();
  }
};
</script>

<style lang="scss" scoped>
.my-collection {
  background-color: #ebebeb;
  height: 100%;
  .list {
    background-color: #fff;
    margin-top: 0.2rem;
    padding: 0.4rem 0.3rem;
    .name {
      font-weight: bold;
      font-size: 0.36rem;
    }
    .count {
      margin-top: 0.3rem;
      color: #999;
      font-size: 0.32rem;
    }
  }
  .add_collection {
    position: absolute;
    float: right;
    top: 13rem;
    right: 0.5rem;
    background-color: #26a2ff;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 1.2rem;
    .add {
      color: #fff;
      float: right;
      font-size: 0.8rem;
      margin: 0.2rem 0.35rem 0 0;
    }
  }
}
</style>
