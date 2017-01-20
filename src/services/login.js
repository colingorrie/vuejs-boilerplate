import Vue from "vue";

export default {
  route: "/api/v1.0/login",
  post(data) {
    return Vue.http.post(this.route, data)
      .then((response) => { return Promise.resolve(response); })
      .catch((error) => { return Promise.reject(error); });
  }
};
