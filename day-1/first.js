const fs = require('fs');
const path = require('path');

const solution = fs.readFileSync(path.join(__dirname,'input.csv'),'utf-8')
    .split(', ')
    .map(instruction => {
        return {
            turn: instruction[0] == 'R' ? 1 : -1,
            go: parseInt(instruction.slice(1))
        }
    })
    .reduce((coordinate, instruction) => {
        switch ((coordinate.direction + instruction.turn) % 4) {
            case 0:
                return {
                    x: coordinate.x,
                    y: coordinate.y + instruction.go,
                    direction: coordinate.direction + instruction.turn
                };
            case 1:
                return {
                    x: coordinate.x + instruction.go,
                    y: coordinate.y,
                    direction: coordinate.direction + instruction.turn
                };
            case 2:
                return {
                    x: coordinate.x,
                    y: coordinate.y - instruction.go,
                    direction: coordinate.direction + instruction.turn
                };
            case 3:
                return {
                    x: coordinate.x - instruction.go,
                    y: coordinate.y,
                    direction: coordinate.direction + instruction.turn
                };
            case -1:
                return {
                    x: coordinate.x - instruction.go,
                    y: coordinate.y,
                    direction: coordinate.direction + instruction.turn
                };
            case -2:
                return {
                    x: coordinate.x,
                    y: coordinate.y - instruction.go,
                    direction: coordinate.direction + instruction.turn
                };
            case -3:
                return {
                    x: coordinate.x + instruction.go,
                    y: coordinate.y,
                    direction: coordinate.direction + instruction.turn
                };
        }
    }, {x: 0, y: 0, direction: 0});



console.log('First solution: '+ (Math.abs(solution.x) + Math.abs(solution.y)));
