const fs = require('fs');
const path = require('path');

const solution = fs.readFileSync(path.join(__dirname, 'input'), 'utf-8')
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => {
        return line.split(' ')
            .filter(part => part.length > 0)
            .map(part => parseInt(part));
    })
    .reduce((sum,sides) => {
        if (sides[0] < sides[1] + sides[2] &&
            sides[1] < sides[0] + sides[2] &&
            sides[2] < sides[1] + sides[0]) {
            return sum + 1;
        } else {
            return sum;
        }
    }, 0);
console.log(solution);
