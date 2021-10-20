import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Console from "@/views/Console.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Console",
    component: Console,
    // children: [
    //   {
    //     path: "bom",
    //     name: "bom",
    //     component: ,
    //     props: true,
    //   },
    //   {
    //     path: "manufacturers",
    //     name: "manufacturers",
    //     component: ,
    //     props: true,
    //   },
    //   {
    //     path: "suppliers",
    //     name: "suppliers",
    //     component: ,
    //     props: true,
    //   },
    //   {
    //     path: "parts",
    //     name: "parts",
    //     component: ,
    //     props: true,
    //   }
    // ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
