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

// Complete the minimumSwaps function below.
function minimumSwaps(arr) {
    let i = 0;
    for (let j = 0; j < arr.length; j++) {
        arr[j]--;
    }

    let swaps = 0;

    while (i < arr.length) {
        if (arr[i] !== i) {
            const j = arr[i];
            const tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;

            swaps++;
        } else {
            i++;
        }
    }

    return swaps;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();
}
