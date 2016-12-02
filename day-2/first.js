const fs = require('fs');
const path = require('path');

const solution = fs.readFileSync(path.join(__dirname,'input'),'utf-8')
    .split('\n')
    .filter(line => line.length > 0)
    .reduce((pin, line) => {
        const newNumber = line.split('').reduce((position, command) => {
            switch(command) {
                case 'R':
                    return position[0] == 3 ? position : [position[0] + 1, position[1]];
                case 'L':
                    return position[0] == 1 ? position : [position[0] - 1, position[1]];
                case 'U':
                    return position[1] == 1 ? position : [position[0], position[1] - 1];
                case 'D':
                    return position[1] == 3 ? position : [position[0], position[1] + 1];
            }
        }, pin[pin.length-1]);
        return pin.concat([newNumber]);
    },[[2,2]]);

console.log(solution);
