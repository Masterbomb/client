import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueLoggerPlugin from "vuejs-logger/dist/vue-logger";
const isProduction = process.env.NODE_ENV === "production";

const options = {
  isEnabled: true,
  logLevel: isProduction ? "error" : "debug",
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: "|",
  showConsoleColors: true,
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(VueLoggerPlugin, options);
