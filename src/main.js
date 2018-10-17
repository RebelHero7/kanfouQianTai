import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/reset.css";
import "./assets/styles/iconfont.css";
import "./assets/styles/border.css";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import store from "./store/index";
import use from "./assets/js/use"; //时间转换
import Vuetify from 'vuetify'
import vant from "vant";
import "vant/lib/vant-css/index.css";
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false;
Vue.use(MintUI);
Vue.use(vant);
Vue.use(Vuetify);
Vue.prototype.use = use;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
