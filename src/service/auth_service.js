

const state = {
    user: null,
    feature: [],
}

const getters = {
    isAuthenticated: state => !!state.user,
    StateUser: (state) => state.user,
    StateFeature: (state) => state.feature,
}

const actions = {
    // async Register({dispatch}, form) {
    //   // let UserForm = new FormData()
    //   // UserForm.append('username', form.username)
    //   // UserForm.append('password', form.password)
    //   await dispatch('LogIn', form)
    // },
  
    async LogIn({commit}, user) {
      await commit("setUser", user);
    },

    async LogOut({ commit }) {
      let user = null;
      commit("logout", user);
    },
};

const mutations = {
    setUser(state, email) {
      state.user = email;
    },
    logout(state, user) {
      state.user = user;
    },
    
};

const auth = {
    state,
    getters,
    actions,
    mutations,
};

export default auth;