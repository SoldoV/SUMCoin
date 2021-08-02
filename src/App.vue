<template>
    <div id="app">
        <Drawer />
        <Header />
        <Block class="row-center" />
        <router-view />
    </div>
</template>

<script>
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
        Block: () =>
            import(
                /* webpackChunkName: "header" */
                './components/Block'
            ),
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
