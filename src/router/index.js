import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UninOneView from "@/views/UninOneView.vue";
import UninTwoView from "@/views/UninTwoView.vue";
import UninThreeView from "@/views/UninThreeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/unin1",
      name: "unin1",
      component: UninOneView,
    },
    {
      path: "/unin2",
      name: "unin2",
      component: UninTwoView,
    },
    {
      path: "/unin3",
      name: "unin3",
      component: UninThreeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
