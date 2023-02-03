import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import OrdersView from "../views/OrdersView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "orders",
    component: OrdersView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
