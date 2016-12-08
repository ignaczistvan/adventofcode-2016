const fs = require('fs');
const path = require('path');

let lcd = [];
const width = 50;
const height = 6;

for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
        lcd[i] = lcd[i] === undefined ? [] : lcd[i];
        lcd[i][j] = '.';
    }
}

fs.readFileSync(path.join(__dirname, 'input'), 'utf-8')
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => line.split(' '))
    .forEach(line => {
        if(line[0] == 'rect') {
            const x = parseInt(line[1].split('x')[0]);
            const y = parseInt(line[1].split('x')[1]);
            for (var i = 0; i < x; i++) {
                for (var j = 0; j < y; j++) {
                    lcd[j][i] = '█';
                }
            }
        } else if (line[1] == 'row') {
            const rowNumber = parseInt(line[2].split('=')[1]);
            let newRow = [];
            for (var i = 0; i < width; i++) {
                newRow[(i + parseInt(line[4])) % width] = lcd[rowNumber][i];
            }
            newRow.forEach((el, i) => lcd[rowNumber][i] = el);
        } else {
            const colNumber = parseInt(line[2].split('=')[1]);
            let newCol = [];
            for (var i = 0; i < height; i++) {
                newCol[(i + parseInt(line[4])) % height] = lcd[i][colNumber];
            }
            newCol.forEach((el, i) => lcd[i][colNumber] = el);
        }
    });

let calc = 0;
for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
        calc = lcd[i][j] === '█' ? calc + 1 : calc;
        process.stdout.write(lcd[i][j]);
    }
    process.stdout.write('\n');
}

console.log(calc);
