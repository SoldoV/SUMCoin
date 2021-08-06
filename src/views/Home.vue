<template>
    <div v-if="getBlockchain">
        <div class="blocks row-center">
            <Block
                class="row-center"
                v-for="(block, i) in getBlockchain.chain"
                :key="i"
                :block="block"
                :index="i"
                @click.native="selectBlock(i)"
                :class="{ 'active-block': i === selectedBlock }"
            />
        </div>
        <Transactions
            :transactions="getTransactions"
            :headers="headers"
            v-if="selectedBlock !== null"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data: () => ({
        selectedBlock: null,
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
        Block: () =>
            import(
                /* webpackChunkName: "Block" */
                '../components/Block.vue'
            ),
        Transactions: () =>
            import(
                /* webpackChunkName: "Transactions" */
                '../components/Transactions.vue'
            ),
    },
    name: 'Home',
    computed: {
        ...mapGetters({
            getBlockchain: 'getBlockchain',
        }),
        getTransactions() {
            return (
                this.getBlockchain.chain[this.selectedBlock]?.transactions || []
            );
        },
    },
    methods: {
        selectBlock(i) {
            this.selectedBlock = i;
        },
    },
};
</script>

<style lang="scss">
.blocks {
    margin: 0px 100px;
    flex-wrap: wrap;
    justify-content: flex-start !important;
}
</style>
