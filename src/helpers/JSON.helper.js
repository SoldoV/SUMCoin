import { Blockchain } from '../services/blockchain.js';

export function stringify(obj) {
    return JSON.stringify(obj, function(key, value) {
        return typeof value === 'function' ? value.toString() : value;
    });
}

export function parse(str) {
    let o = JSON.parse(str);
    return Object.assign(new Blockchain(), o);
}