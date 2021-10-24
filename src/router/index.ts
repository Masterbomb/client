import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Console from "../views/Console.vue";
import Manufacturers from "../views/Manufacturers.vue";
import Parts from "../views/Parts.vue";
import Bom from "../views/Bom.vue";
import Projects from "../views/Projects.vue";
import Profile from "../views/Profile.vue";
import Supplier from "../views/Suppliers.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "/",
    component: Console,
    children: [
      {
        path: "bom",
        name: "bom",
        component: Bom,
        props: true,
      },
      {
        path: "suppliers",
        name: "suppliers",
        component: Supplier,
        props: true,
      },
      {
        path: "manufacturers",
        name: "manufacturers",
        component: Manufacturers,
        props: true,
      },
      {
        path: "projects",
        name: "projects",
        component: Projects,
        props: true,
      },
      {
        path: "parts",
        name: "parts",
        component: Parts,
        props: true,
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
