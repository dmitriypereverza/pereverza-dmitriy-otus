import Vue from "vue";
import Router from "vue-router";

import GameSettings from "./views/GameSettings/index.vue";
import { BASE_URL } from "@/config";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: GameSettings,
    },
    {
      path: "/game",
      // this generates a separate chunk (about.[hash].js) for this route
      name: "game",
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "game" */ "./views/Game/index.vue"),

    },
  ],
});
