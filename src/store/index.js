import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import things from "./modules/things";

Vue.use(Vuex);

const plugins = [];
const production = process.env.NODE_ENV === "production";

if (production) {
  plugins.push(createPersistedState({
    key: "boilerplate"
  }));
}

export default new Vuex.Store({
  modules: {
    auth,
    things
  },
  strict: !production,
  plugins
});
