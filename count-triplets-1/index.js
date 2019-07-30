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

// Complete the countTriplets function below.
function countTriplets(arr, r) {

    const pairs = {};
    let result = 0;

    arr.forEach(number => {
        if (!pairs[number]) {
            pairs[number] = [0, 0];
        }

        if (number % r === 0 && pairs[number  / r]) {
            const prevPair = pairs[number / r];
            result += prevPair[1];
            pairs[number][1] += prevPair[0];
        }

        pairs[number][0]++;
    });

    return result;
}


// 1 1 4 16 64: (1, 4, 16), (1, 4, 16), (4, 16, 64)

// 1 - (1!, 4, 16)
// 4 - (4!, 16, 64) (1!, 4!, 64))
// 16 - (16!, 64, 256) (4!, 16!, 64) (1!, 4!, 16!)+
// 64 - (...) (16!, 64!, 256), (4!, 16!, 64!)+

// {[number]: [1, 0]}
// 1: {1: [1, 0]}
// 1: {1: [2, 0]}
// 4: {1: [2, 0], 4:[1, 2]}
// 16: {1: [2, 0], 4[1, 2], 16: [1, 1]} -> +2
// 64: {1: [2, 0], 4[1, 2], 16: [1, 1], 64: [1, 1]} -> +!

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nr = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');

    ws.end();
}
