const fs = require('fs');
const path = require('path');

const keyPad = [
    [undefined, undefined, 5, undefined, undefined],
    [undefined,2,6,'A',undefined],
    [1,3,7,'B','D'],
    [undefined, 4, 8, 'C', undefined],
    [undefined, undefined, 9, undefined, undefined]
];

const solution = fs.readFileSync(path.join(__dirname,'input'),'utf-8')
    .split('\n')
    .filter(line => line.length > 0)
    .reduce((pin, line) => {
        const newNumber = line.split('').reduce((position, command) => {
            switch(command) {
                case 'R':
                    newPosition = position[0] == 4 ? position : [position[0] + 1, position[1]];;
                    break;
                case 'L':
                    newPosition = position[0] == 0 ? position : [position[0] - 1, position[1]];
                    break;
                case 'U':
                    newPosition = position[1] == 0 ? position : [position[0], position[1] - 1];
                    break;
                case 'D':
                    newPosition = position[1] == 4 ? position : [position[0], position[1] + 1];
                    break;
            }
            if(keyPad[newPosition[0]][newPosition[1]]) {
                return newPosition;
            }
            else {
                return position;
            }
        }, pin[pin.length-1]);
        return pin.concat([newNumber]);
    },[[0,2]]);

console.log(solution);
