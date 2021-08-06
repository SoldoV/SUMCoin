import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { Blockchain } from '../services/blockchain.js';
import EC from 'elliptic';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

export default new Vuex.Store({
    state: {
        drawer: false,
        blockchain: null,
        walletKeys: [],
    },
    getters: {
        getDrawer: (state) => state.drawer,
        getBlockchain: (state) => state.blockchain,
        getWalletKeys: (state) => state.walletKeys,
        getPendingTransactions: (state) => state.blockchain.pendingTransactions,
    },
    actions: {
        createBlockchain({ dispatch, state }) {
            state.blockchain = new Blockchain();
            console.log(state.blockchain);
            state.blockchain.difficulty = 1;
            dispatch('generateWalletKeys');
        },

        generateWalletKeys({ state }) {
            const ec = new EC.ec('secp256k1');
            const key = ec.genKeyPair();

            state.walletKeys.push({
                keyObj: key,
                publicKey: key.getPublic('hex'),
                privateKey: key.getPrivate('hex'),
            });
            state.blockchain.minePendingTransactions(
                state.walletKeys[0].publicKey
            );

            console.log(this.walletKeys);
        },
        addTransaction({ state }, newTx) {
            console.log(state.blockchain);
            return state.blockchain.addTransaction(newTx);
        },
        async minePendingTransactions({ state }) {
            await state.blockchain.minePendingTransactions(
                state.walletKeys[0].publicKey
            );
        },
    },
    mutations: {
        toggleDrawer(state) {
            state.drawer = !state.drawer;
        },
        setSettings(state, settings) {
            state.blockchain.difficulty = settings.difficulty;
            state.blockchain.miningReward = settings.miningReward;
        },
    },
    modules: {},
    plugins: [vuexLocal.plugin],
});