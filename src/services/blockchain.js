import { Block } from './block.js';
import { Transaction } from './transaction.js';

export class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    serialize() {
        return JSON.stringify(this);
    }

    createGenesisBlock = function() {
        return new Block(Date.now(), [], '0');
    };

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    async minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction(
            null,
            miningRewardAddress,
            this.miningReward
        );
        this.pendingTransactions.push(rewardTx);

        const block = new Block(
            Date.now(),
            this.pendingTransactions,
            this.getLatestBlock().hash
        );
        await block.mineBlock(this.difficulty);

        this.chain.push(block);

        this.pendingTransactions = [];
        return;
    }

    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address');
        }

        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to chain');
        }

        if (transaction.amount <= 0) {
            throw new Error('Transaction amount should be higher than 0');
        }

        if (
            this.getBalanceOfAddress(transaction.fromAddress) <
            transaction.amount
        ) {
            throw new Error('Not enough balance');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        const realGenesis = JSON.stringify(this.createGenesisBlock());

        if (realGenesis !== JSON.stringify(this.chain[0])) {
            return false;
        }

        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (previousBlock.hash !== currentBlock.previousHash) {
                return false;
            }

            if (!currentBlock.hasValidTransactions()) {
                return false;
            }

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
        }

        return true;
    }

    replaceChain(newChain) {
        if (newChain.length <= this.chain.length) {
            console.log('Recieved chain is not longer than the current chain');
            return;
        } else if (!this.isChainValid(newChain)) {
            console.log('Recieved chain is invalid');
            return;
        }

        console.log('Replacing the current chain with new chain');
        this.chain = newChain;
    }
}