import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    quTitle: "",
    quContent: "", //前面两个是提问的时候将值传给标签那个组件的，
    //这个是当前查看的问题或查看的回答所属的问题,
    homeSelected: "1",
    contentSelected: "1",
    questionInfo: {
      id: 0,
      title: "",
      content: "",
      commentCount: 0,
      isFollow: false,
      followCount: 0,
      userId: 0
    },
    //这个是答案用户的信息。
    answerUser: {
      id: 0,
      name: "",
      headUrl: "http://images.nowcoder.com/head/500t.png",
      introduction: "",
      isFollow: false
    },
    //这个是登录用户的信息
    user: {
      id: 0,
      name: "未登录用户",
      headUrl: "http://images.nowcoder.com/head/500t.png",
      sex: 0,
      introduction: "这个人没有简介...",
      hasEnter: 0
    },
    //这个是答案详情，包括id，答案内容，赞同数，评论数, 是否有点赞, 是否有收藏。
    answer: {
      id: 0,
      content: "",
      likeCount: 0,
      commentCount: 0,
      isLike: 0,
      isCollection: false
    },
    //这个是收藏夹的信息
    collection: {
      id: 0,
      collectionName: "",
      collectionCount: 0
    },
    label: {
      id: 0,
      name: "",
      content: "ads",
      imgUrl: "",
      questionCount: 6
    }
  },
  mutations: {
    changeHomeSelected(state, selected) {
      state.homeSelected = selected;
    },
    changeContentSelected(state, selected) {
      state.contentSelected = selected;
    },
    newQuestion(state, qu) {
      state.quTitle = qu.title;
      state.quContent = qu.content;
    },
    questionInfo(state, question) {
      state.questionInfo.followCount = question.followCount;
      state.questionInfo.isFollow = question.isFollow;
      question = question.question;
      state.questionInfo.id = question.id;
      state.questionInfo.title = question.title;
      state.questionInfo.content = question.content;
      state.questionInfo.commentCount = question.commentCount;
      state.questionInfo.follower = question.follower;
    },
    userInfo(state, res) {
      state.user.hasEnter = res.hasEnter;
      res = res.user;
      state.user.id = res.id;
      state.user.name = res.name;
      state.user.headUrl = res.headUrl;
      state.user.sex = res.sex;
      if (res.introduction !== null && res.introduction !== "") {
        state.user.introduction = res.introduction;
      }
    },
    answerUserInfo(state, res) {
      state.answerUser.isFollow = res.isFollow;
      res = res.user;
      state.answerUser.id = res.id;
      state.answerUser.name = res.name;
      state.answerUser.headUrl = res.headUrl;
      state.answerUser.introduction = res.introduction;
    },
    answerInfo(state, res) {
      state.answer.likeCount = res.likeCount;
      state.answer.isLike = res.isLike;
      state.answer.isCollection = res.isCollection;
      state.answer.commentCount = res.commentCount;
      res = res.comment;
      state.answer.id = res.id;
      state.answer.content = res.content;
    },
    likeCountChange(state, likeCount) {
      state.answer.likeCount = likeCount;
    },
    changeIsLike(state, isLike) {
      state.answer.isLike = isLike;
    },
    questionId(state, qId) {
      state.questionInfo.id = qId;
    },
    questionFollowCountChange(state, followcount) {
      state.questionInfo.followCount = followcount;
    },
    collectionInfo(state, collection) {
      state.collection.id = collection.id;
      state.collection.collectionName = collection.collectionName;
      state.collection.collectionCount = collection.collectionCount;
    },
    setLabelId(state, labelId) {
      state.label.id = labelId;
    },
    labelInfo(state, label) {
      state.label.questionCount = label.questionCount;
      label = label.label;
      state.label.id = label.id;
      state.label.name = label.name;
      state.label.content = label.content;
      state.label.imgUrl = label.imgUrl;
    }
  },
  getters: {
    getquestionInfo: state => {
      return state.questionInfo;
    },
    getUserInfo: state => {
      return state.user;
    }
  }
});
