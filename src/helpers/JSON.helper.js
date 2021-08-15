import { Blockchain } from '../services/blockchain.js';

export function stringify(obj) {
    return JSON.stringify(obj, function(key, value) {
        return value;
    });
}

export function parse(str) {
    if (!str) return null;
    let o = JSON.parse(str);
    return Object.assign(new Blockchain(), o);
}