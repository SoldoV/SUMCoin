<template>
    <div class="settings">
        <div class="settings__title">Settings</div>
        <div class="settings__card">
            <div class="settings__label">Difficulty:</div>
            <v-text-field
                type="number"
                placeholder="Difficulty"
                v-model="difficulty"
                outlined
            ></v-text-field>
            <div class="settings__label">Mining reward:</div>
            <v-text-field
                type="number"
                placeholder="Mining reward"
                v-model="miningReward"
                outlined
            ></v-text-field>
            <v-btn class="settings__btn" @click="save">Save</v-btn>
        </div>
        <v-snackbar
            v-model="snackbar"
            color="primary"
            class="snack"
            :timeout="2000"
        >
            Settings successfully saved!

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    data: () => ({
        snackbar: false,
        difficulty: null,
        miningReward: null,
    }),
    computed: {
        ...mapGetters({
            getBlockchain: 'getBlockchain',
        }),
    },
    methods: {
        ...mapMutations(['setSettings']),
        save() {
            this.setSettings({
                difficulty: this.difficulty,
                miningReward: this.miningReward,
            });
            this.snackbar = true;
        },
    },
    mounted() {
        this.difficulty = this.getBlockchain.difficulty;
        this.miningReward = this.getBlockchain.miningReward;
    },
};
</script>

<style lang="scss">
.settings {
    max-width: 1094px;
    width: 100%;
    padding: 0 20px;
    margin: 0 auto;
    &__card {
        max-width: 300px !important;
        width: 100%;
        margin: 0 auto;
    }
    &__title {
        max-width: 700px;
        width: 100%;
        margin: 0 auto;
        margin: 50px auto;
        font-size: 28px;
        font-weight: bold;
        text-align: left;
    }
    &__label {
        margin-bottom: 5px;
        font-weight: 400;
        text-align: left;
        font-size: 14px;
    }
    &__btn {
        background-color: #173268 !important;
        color: #fff !important;
        box-shadow: none !important;
        margin-top: 30px;
        width: 120px !important;
        font-weight: 600 !important;
        border-radius: 20px !important;
    }
}
.snack {
    .v-snack__wrapper {
        background: #22d428 !important;
    }
}
</style>
