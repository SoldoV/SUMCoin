const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

export class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now();
    }

    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(
                this.fromAddress + this.toAddress + this.amount + this.timestamp
            )
            .digest('hex');
    }

    signTransaction(signingKey) {
        const key = ec.keyFromPrivate(signingKey.priv, 'hex');
        if (key.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions for other wallets!');
        }

        const hashTx = this.calculateHash();
        const sig = key.sign(hashTx, 'base64');

        this.signature = sig.toDER('hex');
    }

    isValid() {
        if (this.fromAddress === null) return true;

        if (!this.signature || this.signature.length === 0) {
            throw new Error('No signature in this transaction');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}