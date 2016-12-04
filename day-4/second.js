const fs = require('fs');
const path = require('path');

const solution = fs.readFileSync(path.join(__dirname, 'input'), 'utf-8')
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => {
        return line.split('-');
    })
    .map(line => {
        const tmp = line[line.length - 1].split('[');
        const sector = parseInt(tmp[0]);
        const checksum = tmp[1].slice(0, -1);
        const codeString = line.slice(0, -1).join('');
        let code = {};

        for (var i = 0; i < codeString.length; i++) {
            code[codeString[i]] = code[codeString[i]] === undefined ? 1 : code[codeString[i]] + 1;
        }

        code = Object.keys(code)
            .sort((a,b) => {
                if ((code[a] - code[b]) == 0) {
                    return a > b ? 1 : -1;
                }
                else {
                    return -1 * (code[a] - code[b]);
                }
            });
        code = code[0] + code[1] + code[2] + code[3] + code[4];

        return { sector, checksum, code, codeString}
    })
    .filter(line => line.checksum == line.code)
    .map(room => {
        const abc = "abcdefghijklmnopqrstuvwxyz";
        const decryptedCode = room.codeString
            .split('')
            .map(char => {
                let v = abc.indexOf(char);
                return abc[(v + room.sector) % 26];
            })
            .join('');
        return {
            decryptedCode,
            sector: room.sector
        }
    })
    .filter(room => room.decryptedCode.match(/north|pole/i));

console.log(solution);
