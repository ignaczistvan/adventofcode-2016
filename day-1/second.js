const fs = require('fs');
const path = require('path');
const assert = require('assert');

const instructions = fs.readFileSync(path.join(__dirname,'input.csv'),'utf-8')
    .split(', ')
    .map(instruction => {
        return {
            turn: instruction[0] == 'R' ? 1 : -1,
            go: parseInt(instruction.slice(1))
        }
    });

const findVisitedCoordinate = (instructions, index = 0, currentDirection = 0, history = [[0,0]]) => {
    if (index >= instructions.length) {
        return null;
    }
    else {
        const currentCoordinate = history[history.length-1];
        const newDirection = currentDirection + instructions[index].turn;
        const faszomArray = Array(instructions[index].go).fill(1);
        switch (newDirection % 4) {
            case 0:
                route = Array(instructions[index].go).fill(1).map((a, i) => [currentCoordinate[0], currentCoordinate[1] + i + 1]);
                break;
            case 1:
                route = Array(instructions[index].go).fill(1).map((a, i) => [currentCoordinate[0] + i + 1, currentCoordinate[1]]);
                break;
            case 2:
                route = Array(instructions[index].go).fill(1).map((a, i) => [currentCoordinate[0], currentCoordinate[1] - i - 1]);
                break;
            case 3:
                route = Array(instructions[index].go).fill(1).map((a, i) => [currentCoordinate[0] - i - 1, currentCoordinate[1]]);
                break;
            case -1:
                route = Array(instructions[index].go).fill(1).map((a, i) => [currentCoordinate[0] - i - 1, currentCoordinate[1]]);
                break;
            case -2:
                route = Array(instructions[index].go).fill(1).map((a, i) => [currentCoordinate[0], currentCoordinate[1] - i - 1]);
                break;
            case -3:
                route = Array(instructions[index].go).fill(1).map((a, i) => [currentCoordinate[0] + i + 1, currentCoordinate[1]]);
                break;
        }

        const visitedCoordinate = route.reduce((sum, coordinate) => {
            if (sum) {
                return sum;
            }
            return isInArray(coordinate, history) ? coordinate : false;
        }, false);

        if (visitedCoordinate) {
            return visitedCoordinate;
        }
        else {
            return findVisitedCoordinate(instructions, index+1, newDirection, history.concat(route))
        }
    }
}

const isInArray = (element, array, index = 0) => {
    if (index >= array.length) {
        return false;
    }
    else if (element[0] === array[index][0] && element[1] === array[index][1]) {
        return true;
    }
    else {
        return isInArray(element, array, index+1);
    }
}

console.log('Second solution: ' + findVisitedCoordinate(instructions));
