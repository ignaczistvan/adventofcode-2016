const fs = require('fs');
const path = require('path');

const getABAs = (str) => {
    let abas = [];
    str.split('').forEach((chr, i, arr) => {
        if(chr === arr[i+2] && chr !== arr[i+1]) abas.push(chr+arr[i+1]+arr[i+2]);
    });
    return abas;
};

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
        const supsernetABAs = line.outers.reduce((sum,line) =>{
            return sum.concat(getABAs(line));
        },[]);

         return supsernetABAs.filter(aba => {
            const bab = aba[1]+aba[0]+aba[1];
            return line.inners.filter(hypernet => hypernet.search(bab) > -1).length > 0 ? true : false;
        }).length > 0 ? sum + 1 : sum;
    },0);

console.log(solution);
