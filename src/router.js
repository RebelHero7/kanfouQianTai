import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/home/Home.vue";
import Login from "./pages/loginAndReg/Login.vue";
import Register from "./pages/loginAndReg/Register.vue";
import AddQuestion from "./pages/addQuestion/AddQuestion.vue";
import ChoiceLabel from "./pages/addQuestion/ChoiceLabel.vue";
import QuestionInfo from "./pages/questionInfo/QuestionInfo.vue";
import AddAnswer from "./pages/addAnswer/AddAnswer.vue";
import MyInfo from "./pages/myInfo/MyInfo.vue";
import Notice from "./pages/notice/Notice.vue";
import AnswerInfo from "./pages/answerInfo/AnswerInfo.vue";
import MyAllAnswer from "./pages/myAllAnswer/MyAllAnswer.vue";
import PrivateLetter from "./pages/notice/components/PrivateLetter.vue";
import ChatDetail from "./pages/chatDetail/ChatDetail.vue";
import RecentLook from "./pages/recentLook/RecentLook.vue";
import Follow from "./pages/follow/Follow.vue";
import MyCollection from "./pages/myCollection/MyCollection.vue";
import AddCollection from "./pages/myCollection/AddCollection.vue";
import CollectionInfo from "./pages/myCollection/CollectionInfo.vue";
import Label from "./pages/Label/Label.vue";
import SearchQuestion from "./pages/search/Search.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/loginAndReg",
      name: "loginAndReg",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/questionInfo",
      name: "questionInfo",
      component: QuestionInfo,
      meta: {
        keepAlive: false
      }
      // meta:{awh: true} // 设置当前路由需要校验
    },
    {
      path: "/choiceLabel",
      name: "choiceLabel",
      component: ChoiceLabel
    },
    {
      path: "/addQuestion",
      name: "addQuestion",
      component: AddQuestion
    },
    {
      path: "/addAnswer",
      name: "AddAnswer",
      component: AddAnswer
    },
    {
      path: "/myInfo",
      name: "MyInfo",
      component: MyInfo
    },
    {
      path: "/notice",
      name: "Notice",
      component: Notice
    },
    {
      path: "/answerInfo",
      name: "answerInfo",
      component: AnswerInfo
    },
    {
      path: "/myAllAnswer",
      name: "myAllAnswer",
      component: MyAllAnswer
    },
    {
      path: "/privateLetter",
      name: "privateLetter",
      component: PrivateLetter
    },
    {
      path: "/chatDetail",
      name: "chatDetail",
      component: ChatDetail
    },
    {
      path: "/recentLook",
      name: "recentLook",
      component: RecentLook
    },
    {
      path: "/follow",
      name: "follow",
      component: Follow
    },
    {
      path: "/myCollection",
      name: "myCollection",
      component: MyCollection
    },
    {
      path: "/addCollection",
      name: "addCollection",
      component: AddCollection
    },
    {
      path: "/collectionInfo",
      name: "collectionInfo",
      component: CollectionInfo
    },
    {
      path: "/label",
      name: "label",
      component: Label
    },
    {
      path: "/searchQuestion",
      name: "searchQuestion",
      component: SearchQuestion
    }
  ]
});
