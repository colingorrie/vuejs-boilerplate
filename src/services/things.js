import Vue from "vue";
import store from "../store";

export default {
  route: "/api/v1.0/things",
  get() {
    const headers = Vue.auth.tokenHeader(store.state.auth.token);

    return Vue.http.get(this.route, { headers })
      .then((response) => { return Promise.resolve(response); })
      .catch((error) => { return Promise.reject(error); });
  }
};
