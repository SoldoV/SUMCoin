<template>
    <div class="block">
        <v-card class="block__card mx-auto" max-width="344" outlined>
            <div class="block__title">
                Block {{ index }}
                <p v-if="index == 0">(Genesis block)</p>
            </div>
            <div class="block__body">
                <div>
                    <p>Hash:</p>
                    {{ block.hash }}
                </div>

                <div>
                    <p>Hash of previous block:</p>
                    {{ block.previousHash }}
                </div>

                <div>
                    <p>Nonce:</p>
                    {{ block.nonce }}
                </div>

                <div>
                    <p>Time:</p>
                    {{ getTime(block.timestamp) }}
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    name: 'Block',
    props: {
        block: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
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
.block {
    margin: 10px;
    margin-top: 70px;
    &__card {
        height: 345px;
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
                margin: 0px;
                font-weight: 500;
                display: inline-block;
                color: #173268;
            }
            margin-bottom: 10px;
        }
    }
}
.active-block {
    .block__card {
        border: 2px solid #173268 !important;
    }
}
</style>
