import VueRouter from "vue-router";
import { Route } from "vue-router";
import { Store } from "vuex";

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
  import type { DefineComponent } from "vue";
  const component: DefineComponent<unknown, unknown, unknown>;
  export default component;
}

//Expansion
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $store: Store<unknown>;
    $api: unknown;
    $log: {
      debug(...args: unknown[]): void;
      info(...args: unknown[]): void;
      warning(...args: unknown[]): void;
      error(...args: unknown[]): void;
      fatal(...args: unknown[]): void;
    };
  }
}
