import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () =>
            import ( /* webpackChunkName: "Settings" */ '../views/Settings.vue'),
    },
    {
        path: '/new',
        name: 'new',
        component: () =>
            import ( /* webpackChunkName: "new" */ '../views/NewTransaction.vue'),
    },
    {
        path: '/mine',
        name: 'mine',
        component: () =>
            import ( /* webpackChunkName: "mine" */ '../views/Mining.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;