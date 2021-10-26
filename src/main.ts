import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueLoggerPlugin from "vuejs-logger/dist/vue-logger";
import {
  Category,
  CategoryServiceFactory,
  CategoryConfiguration,
  LogLevel,
} from "typescript-logging";
import dotenv from "dotenv";

// load environment settings
dotenv.config();

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

// Optionally change default settings, in this example set default logging to Info.
// Without changing configuration, categories will log to Error.
CategoryServiceFactory.setDefaultConfiguration(
  new CategoryConfiguration(LogLevel.Debug)
);

// Create categories, they will autoregister themselves, one category without parent (root) and a child category.
export const log = new Category("service");
