import Things from "../../services/things";

const state = {
  items: [],
  hasLoaded: false
};

const getters = {};

const actions = {
  getThings({ commit }) {
    Things.get()
    .then((response) => {
      commit("GET_THINGS", { response });
      return Promise.resolve(response);
    }).catch((error) => {
      return Promise.reject(error);
    });
  }
};

const mutations = {
  GET_THINGS(state, { response }) {
    state.items = response.body;
    state.hasLoaded = true;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
