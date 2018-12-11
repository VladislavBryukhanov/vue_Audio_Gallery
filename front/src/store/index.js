import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    profile: null,
    audioTracks: null
};

const mutations = {
    signIn(state, token) {
        localStorage.setItem('authorization', `Bearer ${token}`);
    },
    getProfile(state, user) {
        state.profile = user;
    },
    logOut(state) {
        localStorage.removeItem('authorization');
        // TODO interseptor for removing
        // TODO reset state
        state.profile = null;
        state.audioTracks = null;
    },

    getAudioTracks(state, tracks) {
        state.audioTracks = [...state.audioTracks, ...tracks];
    },
    addAudioTrack(state, track) {
        state.audioTracks.push(track);
    }
};

const actions = {
//_____Auth_____
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
        context.commit('getProfile', res.data);
    },
    async editProfile(context, user) {
        const res = await Vue.http.put('auth/editProfile', user);
        context.commit('getProfile', res.data);
    },
//______Tracks______
    async getAudioTracks(context, payload) {
        const {id, offset, limit} = payload;
        const res = await Vue.http.get(`audio/getTracks/${id}&${offset}&${limit}`);
        context.commit('getAudioTracks', res.data);
    },
    async addAudioTrack(context, track) {
        const res = await Vue.http.post('audio/addTrack', track);
        context.commit('addAudioTrack', res.data);
    }
};

const store = new Vuex.Store({
    state,
    mutations,
    actions
});

export default store;