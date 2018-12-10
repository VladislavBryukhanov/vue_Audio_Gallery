import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    profile: null
};

const mutations = {
    signIn(state, token) {
        localStorage.setItem('authorization', `Bearer ${token}`);
    },
    setProfile(state, user) {
        state.profile = user;
    },
    logOut(state) {
        localStorage.removeItem('authorization');
        // TODO interseptor for removing
        state.profile = null;
    }
};

const actions = {
    async signIn(context, user) {
        const res = await Vue.http.post('auth/signIn', user);
        context.commit('signIn', res.data);
    },
    async signUp(context, user) {
        const res = await Vue.http.post('auth/signUp', user);
        context.commit('signIn', res.data);
    },
    async getProfile(context) {
        const res = await Vue.http.get('auth/getProfile');
        context.commit('setProfile', res.data);
    },
    async editProfile(context, user) {
        const res = await Vue.http.put('auth/editProfile', user);
        context.commit('setProfile', res.data);
    }
};

const store = new Vuex.Store({
    state,
    mutations,
    actions
});

export default store;