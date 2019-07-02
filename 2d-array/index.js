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

// Complete the hourglassSum function below.
function hourglassSum(arr) {
    let max = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < arr.length - 2; i++) {
        for (let j = 0; j < arr[0].length - 2; j++) {
            const currentHourGlassValue = countHourGlass(arr, i, j);
            if (currentHourGlassValue > max) {
                max = currentHourGlassValue;
            }
        }
    }
    return max;
}

function countHourGlass (arr, i, j) {
    return arr[i][j] + arr[i][j + 1] + arr[i][j + 2]
        + arr[i + 1][j + 1]
        + arr[i + 2][j] + arr[i + 2][j + 1] + arr[i + 2][j + 2];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    let result = hourglassSum(arr);

    ws.write(result + "\n");

    ws.end();
}
