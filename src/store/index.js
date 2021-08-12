import Vue from 'vue';
import Vuex from 'vuex';
import { Blockchain } from '../services/blockchain.js';
import EC from 'elliptic';
import { parse, stringify } from '../helpers/JSON.helper.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        drawer: false,
        blockchain: parse(localStorage.getItem('blockchain')) || null,
        walletKeys: JSON.parse(localStorage.getItem('walletKeys')) || [],
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

            localStorage.setItem('blockchain', stringify(state.blockchain));
            localStorage.setItem(
                'walletKeys',
                JSON.stringify(state.walletKeys)
            );
        },
        addTransaction({ state }, newTx) {
            state.blockchain.addTransaction(newTx);
            return localStorage.setItem(
                'blockchain',
                stringify(state.blockchain)
            );
        },
        async minePendingTransactions({ state }) {
            await state.blockchain.minePendingTransactions(
                state.walletKeys[0].publicKey
            );
            localStorage.setItem('blockchain', stringify(state.blockchain));
        },
        calculateBalanceOfAddress({ state }, address) {
            let balance = 0;

            for (const block of state.blockchain.chain) {
                for (const trans of block.transactions) {
                    if (trans.fromAddress === address) {
                        balance -= parseFloat(trans.amount);
                    }

                    if (trans.toAddress === address) {
                        balance += parseFloat(trans.amount);
                    }
                }
            }
            return balance;
        },
        getWalletTransactions({ state }, address) {
            let transactions = [];
            for (const block of state.blockchain.chain) {
                for (const trans of block.transactions) {
                    if (
                        trans.fromAddress === address ||
                        trans.toAddress === address
                    ) {
                        transactions.push(trans);
                    }
                }
            }
            return transactions;
        },
    },
    mutations: {
        toggleDrawer(state) {
            state.drawer = !state.drawer;
        },
        setSettings(state, settings) {
            state.blockchain.difficulty = settings.difficulty;
            state.blockchain.miningReward = settings.miningReward;
            localStorage.setItem('blockchain', stringify(state.blockchain));
        },
    },
    modules: {},
});