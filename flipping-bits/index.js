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

// Complete the flippingBits function below.
function flippingBits(N) {
    const bits = [];
    for (let i = 0; i < 32; i++) {
        const bit = N % 2;
        bits.push(bit);
        N = (N - bit) / 2;
    }

    const invertedBits = bits.map(bit => 1 - bit);

    let pow = 1;
    let result = 0;
    invertedBits.forEach(bit => {
        result += bit * pow;
        pow *= 2;
    });

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine(), 10);

        const result = flippingBits(n);

        ws.write(result + '\n');
    }

    ws.end();
}
