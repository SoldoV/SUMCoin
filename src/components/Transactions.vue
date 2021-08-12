<template>
    <div class="transactions">
        <div class="transactions__text">Block transactions</div>
        <v-data-table
            :headers="headers"
            :items="transactions"
            item-key="name"
            class="elevation-1 ma-5"
        >
            <template #item.fromAddress="{ item }">
                <v-tooltip
                    bottom
                    content-class="transactions__tooltip"
                    v-if="item.fromAddress"
                >
                    <template v-slot:activator="{ on }">
                        <div
                            v-on="on"
                            class="transactions__link"
                            @click="$router.push(`/wallet/${item.fromAddress}`)"
                        >
                            {{ item.fromAddress }}
                        </div>
                    </template>
                    <span>{{ item.fromAddress }}</span>
                </v-tooltip>
                <div v-else>{{ 'Mining reward (System)' }}</div>
            </template>

            <template #item.toAddress="{ item }">
                <v-tooltip bottom content-class="transactions__tooltip">
                    <template v-slot:activator="{ on }">
                        <div
                            v-on="on"
                            class="transactions__link"
                            @click="$router.push(`/wallet/${item.toAddress}`)"
                        >
                            {{ item.toAddress }}
                        </div>
                    </template>
                    <span>{{ item.toAddress }}</span>
                </v-tooltip>
            </template>

            <template #item.index="{ item }">
                {{ transactions.indexOf(item) }}
            </template>
            <template #item.timestamp="{ item }">
                {{ getTime(item.timestamp) }}
            </template>
        </v-data-table>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    props: {
        transactions: {
            required: true,
            type: Array,
        },
        headers: {
            required: true,
            type: Array,
        },
    },
    methods: {
        getTime(timestamp) {
            return dayjs(timestamp).format('DD/MM/YYYY HH:mm:ss');
        },
    },
};
</script>

<style lang="scss">
.transactions {
    &__text {
        font-weight: bold;
        font-size: 24px;
        margin-top: 50px;
    }
    td {
        max-width: 200px;
        overflow: hidden;
    }
    &__link {
        text-decoration: underline;
        cursor: pointer;
        color: #173268;
    }
}
.transactions__tooltip {
    font-size: 12px !important;
}
</style>
