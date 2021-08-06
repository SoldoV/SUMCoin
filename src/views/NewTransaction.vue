<template>
    <div class="new-transaction">
        <div class="new-transaction__title">Create a new transaction</div>
        <div class="new-transaction__card">
            <div class="new-transaction__label">From address:</div>
            <v-text-field
                placeholder="From address"
                v-model="walletKey.publicKey"
                disabled
                outlined
            ></v-text-field>
            <div class="new-transaction__label">To address:</div>
            <v-text-field
                placeholder="To address"
                v-model="newTx.toAddress"
                outlined
            ></v-text-field>
            <div class="new-transaction__label">Amount:</div>
            <v-text-field
                type="number"
                placeholder="Amount"
                v-model="newTx.amount"
                outlined
            ></v-text-field>
            <v-btn class="new-transaction__btn" @click="createTransaction()"
                >Create Transaction</v-btn
            >
        </div>
        <v-snackbar
            v-model="snackbar"
            color="primary"
            class="snack"
            :timeout="2000"
        >
            Transaction successfully added to pending transactions!

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="blue"
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
import { mapGetters, mapActions } from 'vuex';
import { Transaction } from '@/services/blockchain.js';

export default {
    data: () => ({
        newTx: {},
        walletKey: {},
        snackbar: false,
    }),
    computed: {
        ...mapGetters({
            getWalletKeys: 'getWalletKeys',
        }),
    },
    methods: {
        ...mapActions(['addTransaction']),
        createTransaction() {
            this.newTx.fromAddress = this.walletKey.publicKey;
            this.newTx.signTransaction(this.walletKey.keyObj);
            this.addTransaction(this.newTx).then(() => (this.snackbar = true));

            this.newTx = new Transaction();
        },
    },
    mounted() {
        this.newTx = new Transaction();
        this.walletKey = this.getWalletKeys[0];
        console.log(this.walletKey);
    },
};
</script>

<style lang="scss">
.new-transaction {
    &__card {
        max-width: 700px !important;
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
        width: 250px !important;
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
