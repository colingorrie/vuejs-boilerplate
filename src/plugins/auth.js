const AuthPlugin = {
  tokenHeader(token) {
    return {
      "Authentication-Token": token
    };
  }
};

export default function(Vue) {
  // boilerplate for Vue plugin
  Vue.auth = AuthPlugin;

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get() {
        return Vue.auth;
      }
    }
  });
}
