"use strict"; // We need proper tail calls for recursive functions so we need to use strict mode and harmony flag #state-of-es2015-in-the-end-of-2016
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const input = 'wtnhxymk';

const swordFish = (input, password = '', index = 0) => {
    const hash = crypto.createHash('md5').update(input + index).digest('hex');
    password = hash.slice(0, 5) === '00000' ? password + hash[5] : password;
    return password.length == 8 ? password : swordFish(input, `${password}`, index+1);
};

console.log(swordFish(input));
