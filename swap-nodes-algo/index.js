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

/*
 * Complete the swapNodes function below.
 */
function swapNodes(indexes, queries) {
    /*
     * Write your code here.
     */

    // console.log('[obabichev] travers(indexes)', travers(indexes));

    const result = [];

    queries.forEach(k => {
        swapOperation(indexes, k);
        result.push(travers(indexes));
    });

    return result;
}

function swapOperation(indexes, k) {
    function swapOperationRec(current, depth) {
        if (current < 0) {
            return;
        }

        if (depth % k === 0) {
            const [left, rigth] = indexes[current - 1];
            indexes[current - 1] = [rigth, left];
        }

        swapOperationRec(indexes[current - 1][0], depth + 1);
        swapOperationRec(indexes[current - 1][1], depth + 1);
    }

    swapOperationRec(1, 1);
}

function travers(indexes) {
    const result = [];

    function traversRec(current, depth) {
        if (current < 0) {
            return;
        }

        traversRec(indexes[current - 1][0], depth + 1);
        result.push(current);
        traversRec(indexes[current - 1][1], depth + 1);
    }

    traversRec(1, 1);

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let indexes = Array(n);

    for (let indexesRowItr = 0; indexesRowItr < n; indexesRowItr++) {
        indexes[indexesRowItr] = readLine().split(' ').map(indexesTemp => parseInt(indexesTemp, 10));
    }

    const queriesCount = parseInt(readLine(), 10);

    let queries = [];

    for (let queriesItr = 0; queriesItr < queriesCount; queriesItr++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    let result = swapNodes(indexes, queries);

    ws.write(result.map(x => x.join(' ')).join("\n") + "\n");

    ws.end();
}
