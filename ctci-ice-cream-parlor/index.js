'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

fs.readFile('input', 'utf8', function (err, data) {
    inputString = data.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the whatFlavors function below.
function whatFlavors(costs, money) {

    const costObjs = costs
        .map((cost, index) => ({
            cost,
            id: index + 1
        }))
        .sort((costObj1, costObj2) => costObj1.cost - costObj2.cost);

    let i = 0;
    let j = costObjs.length - 1;

    while (i !== j) {
        const currentSum = costObjs[i].cost + costObjs[j].cost;
        if (currentSum === money) {
            let id1 = costObjs[i].id;
            let id2 = costObjs[j].id;

            if (id1 > id2) {
                const tmp = id1;
                id1 = id2;
                id2 = tmp;
            }

            console.log(`${id1} ${id2}`);
            return;
        }

        if (currentSum < money) {
            i++;
        } else {
            j--;
        }
    }

    return 1;
}

function main() {
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const money = parseInt(readLine(), 10);

        const n = parseInt(readLine(), 10);

        const cost = readLine().split(' ').map(costTemp => parseInt(costTemp, 10));

        whatFlavors(cost, money);
    }
}
