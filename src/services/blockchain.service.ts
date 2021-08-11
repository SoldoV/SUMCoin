import { Blockchain } from './blockchain.js';
import EC from 'elliptic';

export class BlockchainService {
    public blockchainInstance = new Blockchain();
    public walletKeys: Array<IWalletKey> = [];

    constructor() {
        this.blockchainInstance.difficulty = 1;
        this.blockchainInstance.minePendingTransactions('hi');
        this.generateWalletKeys();
    }

    minePendingTransactions() {
        this.blockchainInstance.minePendingTransactions(
            this.walletKeys[0].publicKey
        );
    }

    addressIsFromCurrentUser(address) {
        return address === this.walletKeys[0].publicKey;
    }

    generateWalletKeys() {
        const ec = new EC.ec('secp256k1');
        const key = ec.genKeyPair();

        this.walletKeys.push({
            keyObj: key,
            publicKey: key.getPublic('hex'),
            privateKey: key.getPrivate('hex'),
        });
    }

    getPendingTransactions() {
        return this.blockchainInstance.pendingTransactions;
    }

    addTransaction(tx) {
        this.blockchainInstance.addTransaction(tx);
    }
}

export interface IWalletKey {
    keyObj: any;
    publicKey: string;
    privateKey: string;
}
