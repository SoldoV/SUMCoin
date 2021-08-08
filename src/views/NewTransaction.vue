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
            :color="snackColor"
            class="snack"
            :timeout="2000"
        >
            {{ snackText }}

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
import { mapGetters, mapActions } from 'vuex';
import { Transaction } from '@/services/blockchain.js';

export default {
    data: () => ({
        newTx: {},
        walletKey: {},
        snackbar: false,
        snackColor: '',
        snackText: '',
    }),
    computed: {
        ...mapGetters({
            getWalletKeys: 'getWalletKeys',
            getBlockchain: 'getBlockchain',
        }),
    },
    methods: {
        ...mapActions(['addTransaction', 'calculateBalanceOfAddress']),
        createTransaction() {
            if (this.checkBalance()) {
                this.snackColor = 'red';
                this.snackText = 'Not enough balance';
                this.snackbar = true;
            } else {
                this.newTx.fromAddress = this.walletKey.publicKey;
                this.newTx.signTransaction(this.walletKey.keyObj);

                this.snackColor = 'success';
                this.snackText =
                    'Transaction successfully added to pending transactions!';

                this.addTransaction(this.newTx).then(
                    () => (this.snackbar = true)
                );

                this.newTx = new Transaction();
            }
        },
        checkBalance() {
            return (
                this.calculateBalanceOfAddress(this.walletKey.publicKey) -
                    this.newTx.amount <=
                0
            );
        },
    },
    mounted() {
        this.newTx = new Transaction();
        this.walletKey = this.getWalletKeys[0];
    },
};
</script>

<style lang="scss">
.new-transaction {
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

/* .snack {
    .v-snack__wrapper {
        background: #22d428 !important;
    }
} */
</style>
