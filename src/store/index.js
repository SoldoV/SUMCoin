import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        drawer: false,
    },
    getters: {
        getDrawer: (state) => state.drawer,
    },
    mutations: {
        toggleDrawer(state) {
            state.drawer = !state.drawer;
        },
    },
    actions: {},
    modules: {},
});