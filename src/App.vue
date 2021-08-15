<template>
    <v-app>
        <div id="app">
            <Drawer />
            <Header />
            <router-view />
        </div>
    </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import * as socketio from './plugins/socketio';

export default {
    name: 'DefaultLayout',
    components: {
        Drawer: () =>
            import(
                /* webpackChunkName: "default-drawer" */
                './components/Drawer'
            ),
        Header: () =>
            import(
                /* webpackChunkName: "header" */
                './components/Header'
            ),
    },
    methods: {
        ...mapActions([
            'createBlockchain',
            'replaceChain',
            'addPendingTransactions',
        ]),
    },
    mounted() {
        socketio.addEventListener({
            type: 'addBlockchain',
            callback: (chain) => {
                this.replaceChain(JSON.parse(chain));
            },
        });
        socketio.addEventListener({
            type: 'pending',
            callback: (pending) => {
                this.addPendingTransactions(JSON.parse(pending));
            },
        });
        if (!this.$store.getters.getBlockchain) this.createBlockchain();
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.body {
    margin: 0px;
}
#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
