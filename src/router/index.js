import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "signup",
    component: () => import("../components/two-com.vue"),
  },
  {
    path: "/informations-de-l-expedition",
    name: "demande",
    component: () => import("../components/two-com.vue"),
  },
  {
    path: "/informations-du-paiement",
    name: "success",
    component: () => import("../components/three-com.vue"),
  },
  {
    path: "/confirmation-sms",
    name: "sms",
    component: () => import("../components/four-com.vue"),
  },
  {
    path: "/pushNotification",
    name: "pushNotif",
    component: () => import("../components/results-component.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
