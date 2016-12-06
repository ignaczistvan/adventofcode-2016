const fs = require('fs');
const path = require('path');

const solution = fs.readFileSync(path.join(__dirname, 'input'),'utf-8')
    .split('\n')
    .filter(line => line.length > 0)
    .reduce((sum, line) => {
        line.split('').forEach((char, i) => {
            sum[i] = sum[i] == undefined ? {} : sum[i];
            sum[i][char] = sum[i][char] == undefined ? 1 : sum[i][char] + 1;
        });
        return sum;
    }, [])
    .map(column => {
        return Object.keys(column)
                .map(key => [key, column[key]])
                .sort((a,b) => b[1] - a[1]);
    })
    .reduce((sum, column) => sum+column[0][0],'');

console.log(solution);
