<template>
    <div class="wallet">
        <div class="wallet__title">Wallet details:</div>
        <div class="wallet__subtitle">Address:</div>
        <div class="wallet__text">{{ $route.params.id }}</div>
        <div class="wallet__subtitle">Balance:</div>
        <div class="wallet__text">
            {{ balance }}
        </div>
        <Transactions :transactions="transactions" :headers="headers" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        Transactions: () =>
            import(
                /* webpackChunkName: "Transactions" */
                '../components/Transactions.vue'
            ),
    },
    data: () => ({
        snackbar: false,
        difficulty: null,
        miningReward: null,
        balance: null,
        transactions: [],
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
            { text: 'IsValid', sortable: false, value: 'isValid()' },
        ],
    }),
    computed: {
        ...mapGetters({
            getBlockchain: 'getBlockchain',
        }),
    },
    watch: {
        $route() {
            this.setData();
        },
    },
    methods: {
        ...mapActions(['calculateBalanceOfAddress', 'getWalletTransactions']),
        setData() {
            this.calculateBalanceOfAddress(this.$route.params.id).then(
                (res) => (this.balance = res)
            );
            this.getWalletTransactions(this.$route.params.id).then(
                (res) => (this.transactions = res)
            );
        },
    },
    mounted() {
        this.setData();
    },
};
</script>

<style lang="scss">
.wallet {
    text-align: left;
    max-width: 1094px;
    width: 100%;
    padding: 0 20px;
    margin: 0 auto;
    &__title {
        margin: 50px auto;
        font-size: 28px;
        font-weight: bold;
        text-align: left;
    }
    &__subtitle {
        color: black;
        font-weight: 500;
    }
    &__text {
        color: black;
        word-wrap: break-word;
        max-width: 100%;
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 20px;
    }
}
</style>
