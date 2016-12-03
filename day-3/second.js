const fs = require('fs');
const path = require('path');

const isTriangle = (sides) => {
    if (sides[0] < sides[1] + sides[2] &&
        sides[1] < sides[0] + sides[2] &&
        sides[2] < sides[1] + sides[0]) {
        return 1;
    } else {
        return 0;
    }
}

const solution = fs.readFileSync(path.join(__dirname, 'input'), 'utf-8')
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => {
        return line.split(' ')
            .filter(part => part.length > 0)
            .map(part => parseInt(part));
    })
    .reduce((sum,sides) => {
        if (sum.first.length < 2) {
            return {
                triangles: sum.triangles,
                first: sum.first.concat([sides[0]]),
                second: sum.second.concat([sides[1]]),
                third: sum.third.concat([sides[2]])
            };
        } else {
            const t1 = isTriangle(sum.first.concat([sides[0]]));
            const t2 = isTriangle(sum.second.concat([sides[1]]));
            const t3 = isTriangle(sum.third.concat([sides[2]]));
            return {
                triangles: sum.triangles + t1 + t2 + t3,
                first: [],
                second: [],
                third: []
            }
        }
    }, {triangles: 0, first: [], second: [], third: []});

console.log(solution.triangles);
