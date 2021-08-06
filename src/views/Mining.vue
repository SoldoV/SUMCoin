<template>
    <div class="mining">
        <Transactions
            :transactions="getPendingTransactions"
            :headers="headers"
        />
        <v-btn
            class="mining__btn"
            :loading="loading"
            @click="mineTransactions()"
            >Mine pending transactions</v-btn
        >
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        loading: false,
        headers: [
            {
                value: 'index',
                text: '#',
                align: 'start',
            },
            {
                text: 'From Address',
                sortable: false,
                value: 'fromAddress',
            },
            { text: 'To Address', sortable: false, value: 'toAddress' },
            { text: 'Amount', sortable: false, value: 'amount' },
            { text: 'Time', sortable: false, value: 'timestamp' },
        ],
    }),
    components: {
        Transactions: () =>
            import(
                /* webpackChunkName: "Transactions" */
                '../components/Transactions.vue'
            ),
    },
    computed: {
        ...mapGetters({
            getPendingTransactions: 'getPendingTransactions',
        }),
    },
    methods: {
        ...mapActions(['minePendingTransactions']),

        async mineTransactions() {
            this.loading = true;
            await this.minePendingTransactions().then(() => {
                this.loading = false;
                this.$router.push('/');
            });
        },
    },
};
</script>

<style lang="scss">
.mining {
    &__btn {
        background-color: #173268 !important;
        color: #fff !important;
        box-shadow: none !important;
        margin-top: 30px;
        width: 320px !important;
        font-weight: 600 !important;
        border-radius: 20px !important;
    }
}
</style>
