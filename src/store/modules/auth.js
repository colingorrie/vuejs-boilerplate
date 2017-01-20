import { router } from "../../app";
import Login from "../../services/login";
import Logout from "../../services/logout";

const state = {
  isAuthenticated: false,
  isProcessingLogin: false,
  token: null
};

const getters = {};

const actions = {
  getToken({ commit }, payload) {
    commit("GET_TOKEN_PENDING");

    return Logout.get()
      .then(() => {  // must be logged out, or cannot get token
        return Login.post(payload);
      })
      .then((response) => {
        const token = response.body.response.user.authentication_token;
        commit("GET_TOKEN_SUCCESS", token);  // we maintain token in Vuex store...
        return Promise.resolve(response);
      })
      .catch((error) => {
        commit("GET_TOKEN_FAILURE", error);
        return Promise.reject(error);
      });
  },

  logout({ commit }, redirect) {
    return Logout.get()
      .then((response) => {
        commit("LOGOUT");

        if (redirect) {
          router.push(redirect);
        }

        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
};

const mutations = {
  GET_TOKEN_PENDING(state) {
    state.isProcessingLogin = true;
  },

  GET_TOKEN_SUCCESS(state, token) {
    state.isAuthenticated = true;
    state.isProcessingLogin = false;
    state.token = token;
  },

  GET_TOKEN_FAILURE(state) {
    state.isProcessingLogin = false;
    state.isAuthenticated = false;
  },

  LOGOUT(state) {
    state.isAuthenticated = false;
    state.token = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
