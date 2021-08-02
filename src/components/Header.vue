<template>
    <div class="header row-align">
        <v-icon class="drawer__close" @click="toggleDrawer()">
            mdi-menu
        </v-icon>
        <div class="header__logo row-align">
            <img src="@/assets/sum2.png" />
            SUMCoin
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    methods: {
        ...mapMutations(['toggleDrawer']),
    },
};
</script>

<style lang="scss">
.header {
    padding: 0px 20px;
    height: 60px;
    width: 100vw;
    background: #173268;
    &__logo {
        font-size: 24px;
        color: #fff;
        font-weight: 600;
        img {
            height: 40px;
            background-size: cover;
            width: 40px;
            margin: 0 10px 0 20px;
        }
    }
}
</style>
