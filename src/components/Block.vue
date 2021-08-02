<template>
    <div class="block">
        <v-card
            class="block__card mx-auto"
            max-width="344"
            outlined
            v-for="(item, i) in block.chain"
            :key="i"
        >
            <div class="block__title">
                Block {{ i }}
                <p v-if="i === 0">(Genesis block)</p>
            </div>
            <div class="block__body">
                <div>
                    <p>Hash:</p>
                    {{ item.hash }}
                </div>

                <div>
                    <p>Hash of previous block:</p>
                    {{ item.previousHash }}
                </div>

                <div>
                    <p>Nonce:</p>
                    {{ item.nonce }}
                </div>

                <div>
                    <p>Time:</p>
                    {{ getTime(item.timestamp) }}
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import { Blockchain } from '../services/blockchain.js';
import dayjs from 'dayjs';

export default {
    data: () => ({
        block: null,
    }),
    methods: {
        getTime(timestamp) {
            return dayjs(timestamp).format('DD/MM/YYYY HH:mm:ss');
        },
    },
    created() {
        this.block = new Blockchain();
    },
};
</script>

<style lang="scss">
.block {
    margin-top: 20px;
    &__card {
        padding: 20px;
        border-color: rgb(184, 184, 184) !important;
    }
    &__title {
        margin-bottom: 15px;
        font-size: 22px;
        font-weight: 600;
        border-bottom: 1px solid rgb(184, 184, 184);
        padding-bottom: 7px;
        p {
            font-weight: 400;
            font-size: 18px;
            color: grey;
        }
    }
    &__body {
        text-align: left;
        div {
            font-weight: 400;
            color: rgb(99, 99, 99);
            p {
                font-weight: 500;
                display: inline-block;
                color: #173268;
            }
            margin-bottom: 10px;
        }
    }
}
</style>
