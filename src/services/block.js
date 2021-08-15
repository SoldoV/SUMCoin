const crypto = require('crypto');
import { Transaction } from './transaction.js';

export class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(
                this.previousHash +
                this.timestamp +
                JSON.stringify(this.transactions) +
                this.nonce
            )
            .digest('hex');
    }

    async mineBlock(difficulty) {
        while (
            this.hash.substring(0, difficulty) !==
            Array(parseInt(difficulty)).fill('0').join('')
        ) {
            this.nonce++;
            this.hash = this.calculateHash();
            //(this.hash);
        }
    }

    hasValidTransactions() {
        for (let tx of this.transactions) {
            tx = Object.assign(new Transaction(), tx);
            if (!tx.isValid()) {
                return false;
            }
        }

        return true;
    }
}