import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Manage from "../components/Manage.vue";
import useUserStore from "../stores/user";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/manage",
    component: Manage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const userStore = useUserStore();
  if (userStore.isLogged) {
    next();
  } else {
    next({
      to: "/",
    });
  }
});

export default router;
