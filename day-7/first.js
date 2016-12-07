const fs = require('fs');
const path = require('path');

const solution = fs.readFileSync(path.join(__dirname, 'input'),'utf-8')
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => {
        let innerRegex = /\[([a-zA-Z]+)\]/g;
        const outers = line.split(/\[[a-zA-Z]+\]/);
        let inners = [];
        var tmp;
        while ((tmp = innerRegex.exec(line)) !== null) {
          inners.push(tmp[1]);
        }
        return {inners, outers};
    })
    .reduce((sum, line) => {
        const innerAbba = line.inners.filter(str => /(.)((?!\1).)\2\1/.test(str)).length > 0 ? true : false;
        const outerAbba = line.outers.filter(str => /(.)((?!\1).)\2\1/.test(str)).length > 0 ? true : false;
        return !innerAbba && outerAbba ? sum + 1 : sum;
    },0);

console.log(solution);
