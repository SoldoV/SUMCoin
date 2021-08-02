<template>
    <transition name="drawer">
        <div class="drawer" v-show="getDrawer">
            <div class="drawer__background" @click="toggleDrawer()"></div>
            <transition name="show">
                <div class="drawer__body" v-if="getDrawer">
                    <div class="drawer__main">
                        <v-icon class="drawer__close" @click="toggleDrawer()">
                            mdi-menu
                        </v-icon>
                        <div class="drawer__list">
                            <div
                                class="drawer__list-item row-align"
                                v-for="(item, i) in listItems"
                                :key="i"
                                @click="router.push(item.path)"
                            >
                                <v-icon class="drawer__close">
                                    {{ item.icon }}
                                </v-icon>
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'DefaultDrawer',
    data: () => ({
        listItems: [
            { name: 'Profile', icon: 'mdi-account', path: '/profile' },
            { name: 'Create Transaction', icon: 'mdi-note-plus', path: '/new' },
            { name: 'Settings', icon: 'mdi-cog', path: '/new' },
        ],
    }),
    computed: {
        getDrawer() {
            return this.$store.getters.getDrawer;
        },
    },
    methods: {
        ...mapMutations(['toggleDrawer']),
    },
};
</script>

<style lang="scss">
.drawer {
    position: relative;
    &__background {
        position: absolute;
        z-index: 99;
        top: 0px;
        right: 0px;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.415);
    }
    &__body {
        width: 350px;
        height: 100vh;
        background: url('../assets/chain.jpg');
        background-size: cover;
        position: absolute;
        z-index: 100;
        top: 0px;
        left: 0px;
    }
    &__main {
        padding: 18px 20px;
        width: 100%;
        height: 100%;
        background: #010818d8;
    }
    &__close {
        color: #fff !important;
        float: left;
        cursor: pointer;
    }
    &__list {
        margin-top: 70px;
        text-align: left;
        font-size: 20px;
        color: #fff;
        width: 350px;
        position: relative;
        right: 20px;
        &-item {
            padding: 0px 20px;
            height: 60px;
            cursor: pointer;
            .v-icon {
                margin-right: 20px;
            }
        }
        &-item:hover {
            background: rgba(0, 0, 0, 0.301);
        }
    }
}
.show-enter-active,
.show-leave-enter {
    transform: translateX(0);
    transition: all 0.2s linear;
}
.show-enter,
.show-leave-to {
    transform: translateX(-100%);
    transition: all 0.2s linear;
}

.drawer-enter-active,
.drawer-leave-active {
    transition: opacity 0.2s;
}
.drawer-enter,
.drawer-leave-to {
    opacity: 0;
}
</style>
