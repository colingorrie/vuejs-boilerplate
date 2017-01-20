import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

import Home from "./components/Home.vue";
import Login from "./components/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "login",
    component: Login,
    meta: { requiresGuest: true, requiresLogin: false },
    path: "/login"
  },
  {
    name: "home",
    component: Home,
    meta: { requiresGuest: false, requiresLogin: true },
    path: "/"
  }
];

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition;
  } else {
    const position = {};
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash;
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0;
      position.y = 0;
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position;
  }
};

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
  scrollBehavior
});

function routeWithGuards(to, next) {
  if (to.matched.some((record) => { return record.meta.requiresGuest; })
  && store.state.auth.isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }

  if (to.matched.some((record) => { return record.meta.requiresLogin; })
  && !store.state.auth.isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
}

function routeWithData(to, next) {
  if (!store.getters.hasLoadedInitialData) {
    // dispatch initial data fetch actions here
    Promise.all([
      store.dispatch("getThings")
    ]).then(() => {
      routeWithGuards(to, next);
    });
  } else {
    // has loaded initial data
    routeWithGuards(to, next);
  }
}

router.beforeEach((to, from, next) => {
  if (store.state.auth.isAuthenticated) {
    routeWithData(to, next);
  } else {
    // user is not authenticated
    routeWithGuards(to, next);
  }
});

export { router };
