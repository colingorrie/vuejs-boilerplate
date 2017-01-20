import Vue from "vue";
import { sync } from "vuex-router-sync";
import VeeValidate from "vee-validate";
import VueResource from "vue-resource";
import Auth from "./plugins/auth";
import store from "./store";
import { router } from "./router";
import App from "./app.vue";

Vue.use(Auth);
Vue.use(VueResource);
Vue.use(VeeValidate);

Vue.http.interceptors.push((request, next) => {
  return next((response) => {
    if (response.status === 401) {  // usually because token has expired
      response.message = "Unauthorized.";
      store.dispatch("logout", { name: "login" });
    }
  });
});

sync(store, router);

// create the app instance
const app = new Vue({
  store,
  router,
  ...App  // object spread copying everything from App.vue
});

export { app, router };
