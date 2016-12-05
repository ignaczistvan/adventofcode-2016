"use strict"; // We need proper tail calls for recursive functions so we need to use strict mode and harmony flag #state-of-es2015-in-the-end-of-2016
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const input = 'wtnhxymk';

const swordFish = (input, password = [], index = 0) => {
    const hash = crypto.createHash('md5').update(input + index).digest('hex');
    if (hash.slice(0, 5) === '00000' && hash[5] < 8) {
        password[hash[5]] = password[hash[5]] === undefined ? hash[6] : password[hash[5]];
    }
    return password.filter(char => char != undefined).length == 8 ? password : swordFish(input, password, index+1);
};

console.log(swordFish(input).join(''));
