const crypto = require('crypto');

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
            console.log(this.hash);
        }
    }

    hasValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }

        return true;
    }
}