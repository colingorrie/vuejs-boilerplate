import Vue from "vue";

export default {
  route: "/api/v1.0/logout",
  get() {
    return Vue.http.get(this.route)
      .then((response) => { return Promise.resolve(response); })
      .catch((error) => { return Promise.reject(error); });
  }
};
