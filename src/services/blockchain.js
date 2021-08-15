import { Block } from './block.js';
import { Transaction } from './transaction.js';
import { parse, stringify } from '../helpers/JSON.helper.js';

export class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock = function() {
        return new Block('10/10/2020', [], '0');
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

        const blockchain = parse(localStorage.getItem('blockchain'));
        blockchain.chain = this.chain;
        blockchain.pendingTransactions = this.pendingTransactions;
        localStorage.setItem('blockchain', stringify(blockchain));

        return;
    }

    addTransaction(transaction) {
        transaction = Object.assign(new Transaction(), transaction);
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address');
        }

        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to chain');
        }

        if (parseFloat(transaction.amount) <= 0) {
            throw new Error('Transaction amount should be higher than 0');
        }

        if (
            parseFloat(this.getBalanceOfAddress(transaction.fromAddress)) <
            parseFloat(transaction.amount)
        ) {
            throw new Error('Not enough balance');
        }

        this.pendingTransactions.push(transaction);
        return true;
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
            const currentBlock = Object.assign(new Block(), this.chain[i]);
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

    replaceChain(blockchain) {
        const newChain = blockchain.chain;
        if (newChain.length <= this.chain.length) {
            console.log('Recieved chain is not longer than the current chain');
            return false;
        } else if (!this.isChainValid(newChain)) {
            console.log('Recieved chain is invalid');
            return false;
        }

        console.log('Replacing the current chain with new chain');
        this.chain = newChain;
        this.difficulty = blockchain.difficulty;
        this.pendingTransactions = blockchain.pendingTransactions;
        this.miningReward = blockchain.miningReward;
        return true;
    }
}