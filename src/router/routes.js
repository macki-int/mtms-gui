
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/ReadoutsAll",
        name: "ReadoutsAll",
        component: () => import("pages/ReadoutsAll.vue"),
      },
      {
        path: "/ApexAreaChart",
        name: "ApexAreaChart",
        component: () => import("pages/ApexAreaChart.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes
